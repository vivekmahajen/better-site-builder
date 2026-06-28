#!/usr/bin/env node
/**
 * Aastha Sacred Data Engine — ingestion pipeline (sourcing -> review -> publish).
 *
 * INVARIANT: nothing is invented here. This tool only moves SOURCED candidate
 * records through review into the published datasets. Every auto-added record
 * lands as `needs_review` first; publishing requires provenance (and, for
 * people, consent for any PII).
 *
 *   node scripts/ingest.mjs add <dataset> <candidate.json>
 *        -> validates shape, forces verification:needs_review, writes to
 *           data/review-queue/<dataset>__<id>.json
 *
 *   node scripts/ingest.mjs publish <queue-file.json>
 *        -> promotes a reviewed record into data/<dataset>.json as `verified`
 *           ONLY if it has >=1 source (and consent for any contact PII).
 *
 *   node scripts/ingest.mjs list
 *        -> show what is waiting in the review queue
 *
 * <dataset> is one of: temples | pujas | astrologers | priests
 */
import { readFileSync, writeFileSync, readdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, basename } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA = join(ROOT, "data");
const QUEUE = join(DATA, "review-queue");
const DATASETS = { temples: "temples.json", pujas: "pujas.json", astrologers: "astrologers.json", priests: "priests.json" };

const load = (p) => JSON.parse(readFileSync(p, "utf8"));
const save = (p, v) => writeFileSync(p, JSON.stringify(v, null, 2) + "\n");
const hasSource = (r) => Array.isArray(r.sources) && r.sources.some((s) => s && s.url && s.retrieved);
const isPII = (c) => !!c && [c?.phone, c?.whatsapp, c?.email, c?.address].some((v) => v != null && String(v).trim() !== "");
const hasConsent = (c) => !!c && c.contact_consent === true && c.consent_source;
const die = (m) => { console.error("✗ " + m); process.exit(1); };

const [cmd, arg1, arg2] = process.argv.slice(2);

if (cmd === "add") {
  const ds = arg1;
  if (!DATASETS[ds]) die(`unknown dataset '${ds}' (use: ${Object.keys(DATASETS).join(", ")})`);
  if (!arg2) die("usage: ingest add <dataset> <candidate.json>");
  const rec = load(arg2);
  if (!rec.id) die("candidate has no id");
  // people without any source never even enter the queue
  if ((ds === "astrologers" || ds === "priests") && !hasSource(rec)) die("refusing to queue a person with no source (fabrication guard)");
  rec.verification = "needs_review"; // forced — review is mandatory
  const out = join(QUEUE, `${ds}__${rec.id}.json`);
  save(out, rec);
  console.log(`✓ queued for review: ${out}\n  → review, then: node scripts/ingest.mjs publish ${out}`);
} else if (cmd === "publish") {
  if (!arg1) die("usage: ingest publish <queue-file.json>");
  const rec = load(arg1);
  const ds = basename(arg1).split("__")[0];
  if (!DATASETS[ds]) die(`cannot infer dataset from filename '${basename(arg1)}'`);
  if (!hasSource(rec)) die("cannot publish without >=1 source { url, retrieved }");
  if ((ds === "astrologers" || ds === "priests") && isPII(rec.contact) && !hasConsent(rec.contact)) {
    die("cannot publish contact PII without contact_consent + consent_source");
  }
  rec.verification = "verified";
  const file = join(DATA, DATASETS[ds]);
  const arr = load(file);
  const i = arr.findIndex((r) => r.id === rec.id);
  if (i >= 0) arr[i] = rec; else arr.push(rec);
  save(file, arr);
  rmSync(arg1);
  console.log(`✓ published ${rec.id} -> data/${DATASETS[ds]} (verified). Run: npm run validate:data`);
} else if (cmd === "list") {
  const files = (() => { try { return readdirSync(QUEUE).filter((f) => f.endsWith(".json")); } catch { return []; } })();
  if (!files.length) { console.log("review queue is empty."); process.exit(0); }
  console.log(`${files.length} record(s) awaiting review:`);
  for (const f of files) { const r = load(join(QUEUE, f)); console.log(`  - ${f}  (sources: ${(r.sources || []).length})`); }
} else {
  console.log("usage:\n  ingest add <dataset> <candidate.json>\n  ingest publish <queue-file.json>\n  ingest list");
}
