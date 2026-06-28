# Aastha Sacred Data Engine — `data/`

Three linked, sourced datasets — **pujas**, **astrologers**, **temple priests** —
cross-linked to a **temples** reference set. This directory and its tooling
encode the **Data-Integrity Doctrine**: trustworthiness is the product, so the
pipeline is built to make fabrication hard and provenance mandatory.

## Doctrine (non-negotiable)

1. **Never fabricate a real person.** Astrologer/priest records come from a real,
   citable source or they do not exist. No source ⇒ not user-facing.
2. **Every record carries provenance** — `sources[] { url, retrieved }` and a
   `verification` status (`verified` / `unverified` / `needs_review`).
3. **Benefits = traditional significance, never guaranteed outcomes.** No
   cure/medical claims, no guaranteed wealth/marriage/jobs, no fear-framing.
   Every puja carries a non-removable `disclaimer`.
4. **PII + consent.** Publish a person's phone/whatsapp/email/address **only**
   with `contact.contact_consent: true` + `consent_source`. Otherwise store the
   public profile link and leave contact null.
5. **No Aastha-invented quality scores about named humans.** "Reputed" =
   verifiable neutral signals only (years active, affiliation, self-published
   credentials, public presence).
6. **Cultural accuracy + respect.** Record regional/sampradaya variants; don't
   flatten or invent procedure.

## Files

| Path | What |
|---|---|
| `temples.json` | Reference temples with stable `temple_*` IDs (FK target). Seeded from the existing darshan list; `needs_review` pending trust-site sourcing. |
| `pujas.json` | Sourced puja catalog (`puja_*`). Empty until rows are sourced. |
| `astrologers.json` | Verified astrologer directory (`astro_*`). Sourced-only; empty until then. |
| `priests.json` | Verified temple-priest directory (`priest_*`). Official-record sourced. |
| `schemas/*.schema.json` | JSON Schemas (the contract). |
| `review-queue/` | Candidate records awaiting human review (always `needs_review`). |

## Pipeline — ingestion, not invention

```
search/fetch a real source  →  ingest add  →  review-queue (needs_review)
                                                   │  human review
                                                   ▼
                                            ingest publish  →  data/<dataset>.json (verified)
```

```bash
# queue a sourced candidate (forced to needs_review; people need >=1 source)
npm run ingest -- add pujas ./candidate.json
npm run ingest -- list

# after human review, promote it (requires provenance; consent for any PII)
npm run ingest -- publish data/review-queue/pujas__puja_xyz.json
```

## Validation (CI gate)

```bash
npm run validate:data            # validate every dataset against the doctrine
npm run validate:data:selftest   # prove the banned-claim + consent gates fire
```

The validator (`scripts/validate-data.mjs`) and the `data-integrity` GitHub
Action reject: missing provenance on `verified` rows, missing puja disclaimer,
banned cure/guarantee/fear claims, published PII without consent, and broken
puja↔temple↔priest foreign keys.

## App read API

`lib/data/index.js` exposes `verifiedPujas()`, `verifiedAstrologers()`,
`verifiedPriests()`, temple lookups, and `pujasForIntent()` for the Devi agent —
all of which return **only** `verification === "verified"` rows, so unsourced
data can never reach the UI.
