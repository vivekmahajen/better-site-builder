// Aastha — persistent backend (SQLite via better-sqlite3)
// Stores real bookings and their stage-by-stage tracking timeline.
import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "aastha.db");

// Reuse one connection across hot reloads / requests.
let db = globalThis.__aasthaDb;

function initDb() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  const conn = new Database(DB_PATH);
  conn.pragma("journal_mode = WAL");
  conn.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id         TEXT PRIMARY KEY,
      puja       TEXT NOT NULL,
      temple     TEXT NOT NULL,
      devotee    TEXT NOT NULL,
      gotra      TEXT,
      priest     TEXT NOT NULL,
      status     TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS steps (
      order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      idx      INTEGER NOT NULL,
      title    TEXT NOT NULL,
      time     TEXT NOT NULL,
      state    TEXT NOT NULL,           -- done | active | pending
      note     TEXT,
      PRIMARY KEY (order_id, idx)
    );
  `);
  seed(conn);
  return conn;
}

function insertOrder(conn, o) {
  const tx = conn.transaction((order) => {
    conn.prepare(
      `INSERT OR REPLACE INTO orders (id,puja,temple,devotee,gotra,priest,status,created_at)
       VALUES (@id,@puja,@temple,@devotee,@gotra,@priest,@status,@created_at)`
    ).run(order);
    const ins = conn.prepare(
      `INSERT OR REPLACE INTO steps (order_id,idx,title,time,state,note)
       VALUES (?,?,?,?,?,?)`
    );
    order.steps.forEach((s, i) => ins.run(order.id, i, s.title, s.time, s.state, s.note ?? null));
  });
  tx(o);
}

function seed(conn) {
  const count = conn.prepare("SELECT COUNT(*) c FROM orders").get().c;
  if (count > 0) return;
  insertOrder(conn, {
    id: "AAS-72401", puja: "Maha Mrityunjaya Jaap", temple: "Mahakaleshwar, Ujjain",
    devotee: "Sharma family", gotra: "Kashyap", priest: "Pt. Ramesh Dwivedi (Verified ✓, 18 yrs)",
    status: "In progress", created_at: "2026-06-14T09:02:00",
    steps: [
      { title: "Order confirmed", time: "14 Jun, 9:02 AM", state: "done", note: "Payment received. Booking #AAS-72401" },
      { title: "Verified priest assigned", time: "14 Jun, 11:20 AM", state: "done", note: "Pt. Ramesh Dwivedi — 18 yrs, Mahakaleshwar" },
      { title: "Sankalp recorded", time: "15 Jun, 8:10 AM", state: "done", note: "Name & gotra pronunciation confirmed with you via call" },
      { title: "Ritual being performed", time: "16 Jun, 6:00 AM", state: "active", note: "Bhasma Aarti slot — unhurried 90-min ritual" },
      { title: "HD video upload", time: "Expected 16 Jun, by 8 PM", state: "pending", note: "Within 48 hrs SLA" },
      { title: "Prasad delivered", time: "Expected 19 Jun", state: "pending", note: "Bhasma prasad • BlueDart #BD55291" },
    ],
  });
  insertOrder(conn, {
    id: "AAS-68233", puja: "Lakshmi Kubera Puja", temple: "Padmavathi, Tirupati",
    devotee: "Anita Reddy", gotra: "Bharadwaj", priest: "Pt. Srinivasa Sharma (Verified ✓, 21 yrs)",
    status: "Completed", created_at: "2026-06-08T19:40:00",
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

export function getDb() {
  if (!db) { db = initDb(); globalThis.__aasthaDb = db; }
  return db;
}

export function getOrder(id) {
  const conn = getDb();
  const order = conn.prepare("SELECT * FROM orders WHERE id = ?").get(String(id).toUpperCase().trim());
  if (!order) return null;
  order.steps = conn.prepare("SELECT title,time,state,note FROM steps WHERE order_id = ? ORDER BY idx").all(order.id);
  return order;
}

export function listOrders() {
  const conn = getDb();
  return conn.prepare("SELECT id,puja,temple,devotee,status,created_at FROM orders ORDER BY created_at DESC").all();
}

// Create a real booking → produces a trackable order with an initial timeline.
export function createBooking({ puja, temple, devotee, gotra, priest }) {
  const conn = getDb();
  const id = "AAS-" + Math.floor(10000 + Math.random() * 89999);
  const now = new Date();
  const stamp = now.toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit", hour12: true });
  const order = {
    id, puja, temple, devotee, gotra: gotra || null,
    priest: priest || "Assigning verified priest…",
    status: "In progress", created_at: now.toISOString(),
    steps: [
      { title: "Order confirmed", time: stamp, state: "done", note: `Payment received. Booking #${id}` },
      { title: "Verified priest assigned", time: "Within 2 hrs", state: "active", note: "Matching a credential-checked priest at " + temple },
      { title: "Sankalp recorded", time: "Before the ritual", state: "pending", note: "We'll call to confirm name & gotra pronunciation" },
      { title: "Ritual performed", time: "On muhurat", state: "pending", note: "Unhurried, full ritual" },
      { title: "HD video uploaded", time: "Within 48 hrs", state: "pending", note: "48-hour SLA, guaranteed" },
      { title: "Prasad delivered", time: "3–5 days", state: "pending", note: "Courier-tracked to your door" },
    ],
  };
  insertOrder(conn, order);
  return order;
}
