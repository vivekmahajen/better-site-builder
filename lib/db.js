// Aastha — persistent backend (PostgreSQL via node-postgres)
// Works locally and on Vercel/Neon/Vercel Postgres via a standard connection
// string in POSTGRES_URL (or DATABASE_URL). Stores real bookings and their
// stage-by-stage tracking timeline.
import { Pool } from "pg";

const CONN = process.env.POSTGRES_URL || process.env.DATABASE_URL;

// Reuse a single pool across hot reloads / serverless warm invocations.
function getPool() {
  if (!CONN) {
    throw new Error("POSTGRES_URL (or DATABASE_URL) is not set. See .env.example.");
  }
  if (!globalThis.__aasthaPool) {
    globalThis.__aasthaPool = new Pool({
      connectionString: CONN,
      // Managed Postgres (Neon/Vercel) requires SSL; local usually doesn't.
      ssl: /localhost|127\.0\.0\.1/.test(CONN) ? false : { rejectUnauthorized: false },
      max: 3,
    });
  }
  return globalThis.__aasthaPool;
}

// Lazily create the schema + seed demo data exactly once per process.
function ensureReady() {
  if (!globalThis.__aasthaReady) {
    globalThis.__aasthaReady = (async () => {
      const pool = getPool();
      await pool.query(`
        CREATE TABLE IF NOT EXISTS orders (
          id         TEXT PRIMARY KEY,
          puja       TEXT NOT NULL,
          temple     TEXT NOT NULL,
          devotee    TEXT NOT NULL,
          gotra      TEXT,
          family     TEXT,
          priest     TEXT NOT NULL,
          status     TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
        ALTER TABLE orders ADD COLUMN IF NOT EXISTS family TEXT;
        CREATE TABLE IF NOT EXISTS steps (
          order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
          idx      INTEGER NOT NULL,
          title    TEXT NOT NULL,
          time     TEXT NOT NULL,
          state    TEXT NOT NULL,
          note     TEXT,
          PRIMARY KEY (order_id, idx)
        );
        CREATE TABLE IF NOT EXISTS donations (
          id         TEXT PRIMARY KEY,
          cause      TEXT NOT NULL,
          donor      TEXT NOT NULL,
          amount     INTEGER NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
      `);
      await seed(pool);
    })().catch((err) => {
      // Allow a later request to retry instead of caching the failure forever.
      globalThis.__aasthaReady = null;
      throw err;
    });
  }
  return globalThis.__aasthaReady;
}

async function insertOrder(pool, o) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      `INSERT INTO orders (id,puja,temple,devotee,gotra,family,priest,status,created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       ON CONFLICT (id) DO NOTHING`,
      [o.id, o.puja, o.temple, o.devotee, o.gotra ?? null, o.family ?? null, o.priest, o.status, o.created_at]
    );
    for (let i = 0; i < o.steps.length; i++) {
      const s = o.steps[i];
      await client.query(
        `INSERT INTO steps (order_id,idx,title,time,state,note)
         VALUES ($1,$2,$3,$4,$5,$6)
         ON CONFLICT (order_id,idx) DO NOTHING`,
        [o.id, i, s.title, s.time, s.state, s.note ?? null]
      );
    }
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

async function seed(pool) {
  const { rows } = await pool.query("SELECT COUNT(*)::int AS c FROM orders");
  if (rows[0].c > 0) return;
  await insertOrder(pool, {
    id: "AAS-72401", puja: "Maha Mrityunjaya Jaap", temple: "Mahakaleshwar, Ujjain",
    devotee: "Sharma family", gotra: "Kashyap", priest: "Pt. Ramesh Dwivedi (Verified ✓, 18 yrs)",
    status: "In progress", created_at: "2026-06-14T09:02:00Z",
    steps: [
      { title: "Order confirmed", time: "14 Jun, 9:02 AM", state: "done", note: "Payment received. Booking #AAS-72401" },
      { title: "Verified priest assigned", time: "14 Jun, 11:20 AM", state: "done", note: "Pt. Ramesh Dwivedi — 18 yrs, Mahakaleshwar" },
      { title: "Sankalp recorded", time: "15 Jun, 8:10 AM", state: "done", note: "Name & gotra pronunciation confirmed with you via call" },
      { title: "Ritual being performed", time: "16 Jun, 6:00 AM", state: "active", note: "Bhasma Aarti slot — unhurried 90-min ritual" },
      { title: "HD video upload", time: "Expected 16 Jun, by 8 PM", state: "pending", note: "Within 48 hrs SLA" },
      { title: "Prasad delivered", time: "Expected 19 Jun", state: "pending", note: "Bhasma prasad • BlueDart #BD55291" },
    ],
  });
  await insertOrder(pool, {
    id: "AAS-68233", puja: "Lakshmi Kubera Puja", temple: "Padmavathi, Tirupati",
    devotee: "Anita Reddy", gotra: "Bharadwaj", priest: "Pt. Srinivasa Sharma (Verified ✓, 21 yrs)",
    status: "Completed", created_at: "2026-06-08T19:40:00Z",
    steps: [
      { title: "Order confirmed", time: "8 Jun, 7:40 PM", state: "done", note: "Payment received. Booking #AAS-68233" },
      { title: "Verified priest assigned", time: "8 Jun, 9:05 PM", state: "done", note: "Pt. Srinivasa Sharma — 21 yrs" },
      { title: "Sankalp recorded", time: "9 Jun, 7:30 AM", state: "done", note: "Name & gotra confirmed" },
      { title: "Ritual performed", time: "10 Jun, 10:15 AM", state: "done", note: "Shri Suktam + Kubera mantra completed" },
      { title: "HD video uploaded", time: "10 Jun, 6:50 PM", state: "done", note: "Watch in your account → Orders" },
      { title: "Prasad delivered", time: "13 Jun, 2:20 PM", state: "done", note: "Yantra + prasad delivered • signed by recipient" },
    ],
  });
}

export async function getOrder(id) {
  await ensureReady();
  const pool = getPool();
  const key = String(id).toUpperCase().trim();
  const { rows } = await pool.query("SELECT * FROM orders WHERE id = $1", [key]);
  if (rows.length === 0) return null;
  const order = rows[0];
  const steps = await pool.query(
    "SELECT title,time,state,note FROM steps WHERE order_id = $1 ORDER BY idx",
    [order.id]
  );
  order.steps = steps.rows;
  return order;
}

export async function listOrders() {
  await ensureReady();
  const pool = getPool();
  const { rows } = await pool.query(
    "SELECT id,puja,temple,devotee,status,created_at FROM orders ORDER BY created_at DESC"
  );
  return rows;
}

// Create a real booking → produces a trackable order with an initial timeline.
export async function createBooking({ puja, temple, devotee, gotra, priest, family }) {
  await ensureReady();
  const pool = getPool();
  const id = "AAS-" + Math.floor(10000 + Math.random() * 89999);
  const now = new Date();
  const stamp = now.toLocaleString("en-IN", {
    day: "numeric", month: "short", hour: "numeric", minute: "2-digit", hour12: true,
  });
  const fam = family && family.trim() ? family.trim() : null;
  const sankalpNote = fam
    ? `Names chanted in the sankalp: ${devotee}, ${fam}`
    : "We'll call to confirm name & gotra pronunciation";
  const order = {
    id, puja, temple, devotee, gotra: gotra || null, family: fam,
    priest: priest || "Assigning verified priest…",
    status: "In progress", created_at: now.toISOString(),
    steps: [
      { title: "Order confirmed", time: stamp, state: "done", note: `Payment received. Booking #${id}` },
      { title: "Verified priest assigned", time: "Within 2 hrs", state: "active", note: "Matching a credential-checked priest at " + temple },
      { title: "Sankalp recorded", time: "Before the ritual", state: "pending", note: sankalpNote },
      { title: "Ritual performed", time: "On muhurat", state: "pending", note: "Unhurried, full ritual" },
      { title: "HD video uploaded", time: "Within 48 hrs", state: "pending", note: "48-hour SLA, guaranteed" },
      { title: "Prasad delivered", time: "3–5 days", state: "pending", note: "Courier-tracked to your door" },
    ],
  };
  await insertOrder(pool, order);
  return order;
}

// Temple donation (daan) — persists a receipt row.
export async function createDonation({ cause, donor, amount }) {
  await ensureReady();
  const pool = getPool();
  const id = "DAAN-" + Math.floor(10000 + Math.random() * 89999);
  await pool.query(
    "INSERT INTO donations (id, cause, donor, amount) VALUES ($1, $2, $3, $4)",
    [id, cause, donor, Math.round(amount)],
  );
  return { id, cause, donor, amount: Math.round(amount), created_at: new Date().toISOString() };
}
