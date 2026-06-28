#!/usr/bin/env node
/**
 * Aastha Sacred Data Engine — data-integrity validator (dependency-free).
 *
 * Enforces the Data-Integrity Doctrine in CI:
 *  - schema: required fields + id/verification shape per data/schemas/*.json
 *  - provenance: every `verified` record has >=1 real source (url + retrieved)
 *  - disclaimer: every puja carries a non-empty disclaimer
 *  - no banned claims: puja benefit/significance text has no cure/guarantee/fear phrasing
 *  - consent: no published PII (phone/whatsapp/email/address) without contact_consent + source
 *  - referential integrity: puja<->temple<->priest foreign keys resolve
 *  - dedupe: no duplicate records by normalized name + locus
 *
 * Run:  node scripts/validate-data.mjs            (validate datasets)
 *       node scripts/validate-data.mjs --selftest (prove the gates work)
 *
 * Exits non-zero on any violation.
 */
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA = join(ROOT, "data");
const SCHEMAS = join(DATA, "schemas");

// ── Banned-claim patterns (puja text). Significance-framed health/prosperity is
//    allowed; guarantees, medical cures and fear-framing are not. ──────────────
const BANNED = [
  { re: /\bguarantee/i, why: "guarantee/guaranteed outcome" },
  { re: /\b100\s?%/, why: "absolute '100%' claim" },
  { re: /\bcure[sd]?\b/i, why: "medical cure claim" },
  { re: /will\s+heal\b/i, why: "'will heal' claim" },
  { re: /heal(s|ing)?\s+(disease|illness|cancer|diabetes|infertility|covid)/i, why: "heals-disease claim" },
  { re: /definitely\s+(get|cure|win|conceive|marry)/i, why: "'definitely ...' guarantee" },
  { re: /\bensures?\b[^.]{0,20}(wealth|money|riches|\bson\b|male\s+child|pregnancy|marriage|job|success)/i, why: "ensures-outcome guarantee" },
  { re: /you\s+will\s+(be\s+cured|get\s+rich|become\s+rich|win|conceive|marry|have\s+a\s+son)/i, why: "personal-outcome guarantee" },
  { re: /\bcalamit/i, why: "fear-based 'calamity' framing" },
  { re: /misfortune\s+if\b/i, why: "fear-based 'misfortune if' framing" },
  { re: /if\s+you\s+(don'?t|do\s?not|skip|fail|miss)[^.]{0,40}(suffer|die|lose|curse|ruin|misfortune)/i, why: "fear-based consequence framing" },
];
function bannedHits(text) {
  if (!text) return [];
  return BANNED.filter((b) => b.re.test(String(text))).map((b) => b.why);
}

// ── helpers ──────────────────────────────────────────────────────────────────
const load = (p) => JSON.parse(readFileSync(p, "utf8"));
const norm = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const isPII = (c) => !!c && [c.phone, c.whatsapp, c.email, c.address].some((v) => v != null && String(v).trim() !== "");
const hasConsent = (c) => !!c && c.contact_consent === true && c.consent_source != null && String(c.consent_source).trim() !== "";
const hasSource = (r) => Array.isArray(r.sources) && r.sources.some((s) => s && s.url && s.retrieved);

const errors = [];
const warnings = [];
const err = (where, msg) => errors.push(`✗ [${where}] ${msg}`);
const warn = (where, msg) => warnings.push(`! [${where}] ${msg}`);

// ── self-test: prove the gates actually fire ─────────────────────────────────
function selftest() {
  let ok = true;
  const expectBanned = [
    "This puja will cure cancer", "guaranteed wealth and a job", "100% results",
    "it will heal your disease", "you will definitely get married",
    "ensures a male child", "calamity will befall the family", "misfortune if you skip this",
  ];
  const expectClean = [
    "Traditionally performed seeking health and longevity.",
    "Devotees observe this ritual for wellbeing and protection, per the Shiva Purana.",
    "Associated in scripture with prosperity and the removal of obstacles.",
    "A lifecycle samskara marking a child's naming.",
  ];
  for (const s of expectBanned) {
    if (bannedHits(s).length === 0) { ok = false; console.error(`  selftest FAIL: banned text not caught -> "${s}"`); }
  }
  for (const s of expectClean) {
    if (bannedHits(s).length > 0) { ok = false; console.error(`  selftest FAIL: clean text flagged -> "${s}" (${bannedHits(s)})`); }
  }
  // consent gate
  if (!isPII({ phone: "+91..." })) { ok = false; console.error("  selftest FAIL: PII not detected"); }
  if (hasConsent({ contact_consent: true, consent_source: null })) { ok = false; console.error("  selftest FAIL: consent passed without source"); }
  if (!hasConsent({ contact_consent: true, consent_source: "https://..." })) { ok = false; console.error("  selftest FAIL: valid consent rejected"); }
  console.log(ok ? "✓ selftest passed — banned-claim + consent gates work" : "✗ selftest FAILED");
  process.exit(ok ? 0 : 1);
}
if (process.argv.includes("--selftest")) selftest();

// ── generic schema-required check ────────────────────────────────────────────
function requiredOf(schemaFile) {
  try { return load(join(SCHEMAS, schemaFile)).required || []; } catch { return []; }
}
function checkRequired(where, rec, required) {
  for (const f of required) {
    const v = rec[f];
    if (v == null || (typeof v === "string" && v.trim() === "") || (Array.isArray(v) && f !== "sources" && f !== "benefits" && v.length === 0)) {
      err(where, `missing required field '${f}'`);
    }
  }
}

// ── load datasets ────────────────────────────────────────────────────────────
const temples = load(join(DATA, "temples.json"));
const pujas = load(join(DATA, "pujas.json"));
const astrologers = load(join(DATA, "astrologers.json"));
const priests = load(join(DATA, "priests.json"));

const templeIds = new Set(temples.map((t) => t.id));
const pujaIds = new Set(pujas.map((p) => p.id));

const counts = {};
const tally = (ds, r) => { counts[ds] = counts[ds] || {}; counts[ds][r.verification] = (counts[ds][r.verification] || 0) + 1; };

// ── temples ──────────────────────────────────────────────────────────────────
const tReq = requiredOf("temple.schema.json");
const seenTemple = new Map();
for (const t of temples) {
  const w = `temple:${t.id || "?"}`;
  checkRequired(w, t, tReq);
  if (t.id && !/^temple_[a-z0-9_]+$/.test(t.id)) err(w, `bad id format '${t.id}'`);
  if (!["verified", "unverified", "needs_review"].includes(t.verification)) err(w, `bad verification '${t.verification}'`);
  if (t.verification === "verified" && !hasSource(t)) err(w, "verified temple has no source");
  const key = norm(t.name) + "|" + norm(t.state);
  if (seenTemple.has(key)) err(w, `duplicate temple (same name+state as ${seenTemple.get(key)})`);
  else seenTemple.set(key, t.id);
  tally("temples", t);
}

// ── pujas ────────────────────────────────────────────────────────────────────
const pReq = requiredOf("puja.schema.json");
const seenPuja = new Map();
for (const p of pujas) {
  const w = `puja:${p.id || "?"}`;
  checkRequired(w, p, pReq);
  if (p.id && !/^puja_[a-z0-9_]+$/.test(p.id)) err(w, `bad id format '${p.id}'`);
  if (!["verified", "unverified", "needs_review"].includes(p.verification)) err(w, `bad verification '${p.verification}'`);
  if (!p.disclaimer || String(p.disclaimer).trim().length < 10) err(w, "missing/short disclaimer (required on every puja)");
  if (p.verification === "verified" && !hasSource(p)) err(w, "verified puja has no source");
  // banned-claim scan
  const texts = [p.significance, ...(p.benefits || []).flatMap((b) => [b.intent, b.framing]), ...(p.performed_for_occasions || [])];
  for (const t of texts) for (const why of bannedHits(t)) err(w, `banned claim (${why}) in: "${String(t).slice(0, 80)}"`);
  // benefits shape
  for (const b of p.benefits || []) if (!b.intent || !b.framing) err(w, "benefit missing intent/framing");
  // FK
  for (const tid of p.offered_at_temples || []) if (!templeIds.has(tid)) err(w, `offered_at_temples -> unknown temple '${tid}'`);
  for (const rid of p.related_pujas || []) if (!pujaIds.has(rid)) err(w, `related_pujas -> unknown puja '${rid}'`);
  const key = norm(p.name?.common) + "|" + (p.deity || []).map(norm).join(",");
  if (seenPuja.has(key)) err(w, `duplicate puja (same name+deity as ${seenPuja.get(key)})`);
  else seenPuja.set(key, p.id);
  tally("pujas", p);
}

// ── people (astrologers + priests): provenance + consent ─────────────────────
function checkPerson(ds, rec, required, extraFK) {
  const w = `${ds}:${rec.id || "?"}`;
  checkRequired(w, rec, required);
  if (!["verified", "unverified", "needs_review"].includes(rec.verification)) err(w, `bad verification '${rec.verification}'`);
  // NEVER a real person without a source
  if (!hasSource(rec) && rec.verification === "verified") err(w, "verified person has no source (fabrication risk)");
  if (!hasSource(rec) && rec.verification === "unverified") err(w, "unverified person must still cite a source or be removed");
  if (!rec.correction_contact) err(w, "missing correction/removal contact");
  // consent gate on PII
  if (isPII(rec.contact) && !hasConsent(rec.contact)) err(w, "published contact PII without contact_consent + consent_source");
  if (extraFK) extraFK(w, rec);
  tally(ds, rec);
}
const aReq = requiredOf("astrologer.schema.json");
for (const a of astrologers) checkPerson("astrologers", a, aReq);
const prReq = requiredOf("priest.schema.json");
for (const pr of priests) checkPerson("priests", pr, prReq, (w, rec) => {
  if (rec.temple_id && !templeIds.has(rec.temple_id)) err(w, `temple_id -> unknown temple '${rec.temple_id}'`);
  for (const sid of rec.services_offered || []) if (!pujaIds.has(sid)) err(w, `services_offered -> unknown puja '${sid}'`);
});

// ── review-queue sanity (auto-extracted records must be needs_review) ─────────
try {
  for (const f of readdirSync(join(DATA, "review-queue")).filter((f) => f.endsWith(".json"))) {
    const rec = load(join(DATA, "review-queue", f));
    if (rec.verification && rec.verification !== "needs_review") err(`review-queue:${f}`, "queued record must be 'needs_review' until reviewed");
  }
} catch { /* no queue dir */ }

// ── report ───────────────────────────────────────────────────────────────────
console.log("Aastha data-integrity report");
console.log("counts by verification:", JSON.stringify(counts));
if (warnings.length) { console.log("\nWarnings:"); warnings.forEach((m) => console.log("  " + m)); }
if (errors.length) {
  console.log(`\n${errors.length} violation(s):`);
  errors.forEach((m) => console.log("  " + m));
  process.exit(1);
}
console.log("\n✓ all data-integrity checks passed");
