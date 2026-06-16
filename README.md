# Aastha — a better devotional platform

A full-stack **Next.js** app built to **out-do [srimandir.com](https://www.srimandir.com)** by closing the gaps that real devotees complain about. See [`ANALYSIS.md`](./ANALYSIS.md) for the full competitive analysis (Sri Mandir vs VAMA vs Utsav) and the gap-by-gap closure plan.

## The one-line pitch

> **Sri Mandir's breadth + Utsav's prasad/subscription model + VAMA's live astrology — wrapped in radical transparency** (live order tracking, verified priests, clear pricing) that none of them offer.

## Tech stack

- **Next.js 15** (App Router, React 19) — server components + client islands
- **PostgreSQL** (`pg`) — persistent bookings & order-tracking timelines; serverless-ready (Vercel Postgres / Neon)
- **API routes** — `POST /api/bookings`, `GET /api/bookings`, `GET /api/orders/[id]`
- No external runtime requests; self-contained design system in `app/globals.css`

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home — hero, gap-closers, live tracking demo, popular pujas, how-it-works, honest comparison table, testimonials |
| `/pujas` | Browse pujas with category filters, all-inclusive pricing, "what's included", verified priests, **real booking flow** + subscription pujas |
| `/track-order` | **The differentiator** — stage-by-stage live order tracking, backed by the database (deep-linkable: `?id=AAS-72401`) |
| `/live-darshan` | Live aarti/darshan schedule across temples |
| `/astrology` | Book verified astrologers with transparent per-minute pricing |
| `/daily` | Today's Panchang + free, ad-free aarti/chalisa/bhajan library |

## How the backend works

Booking a puja (`POST /api/bookings`) creates a real row in Postgres with a generated `AAS-#####` ID and a six-stage tracking timeline. The Track Order page (`GET /api/orders/[id]`) reads it back — so a puja you book is **immediately trackable**, exactly the transparency Sri Mandir lacks. The schema is created and two demo orders (`AAS-72401`, `AAS-68233`) are seeded automatically on first request.

The data layer (`lib/db.js`) connects via a standard `POSTGRES_URL` (or `DATABASE_URL`) connection string, so it runs identically on a local Postgres, Neon, or Vercel Postgres. SSL is enabled automatically for managed (non-localhost) hosts.

## Gaps closed (vs Sri Mandir)

1. Opaque fulfilment → **live, DB-backed order tracking** with timestamps & SLAs
2. Unresponsive support → 24×7 human support with a published response SLA
3. Login/OTP defects → secure self-serve account with dual-OTP phone change
4. Wrong names / rushed pujas → **verified priests** + name-pronunciation confirmation + unhurried-ritual guarantee
5. No live darshan → dedicated **Live Darshan** page
6. Weak prasad logistics → courier-tracked prasad inside the order timeline
7. No live astrology → **Astrology** consultations
8. Opaque pricing → all-inclusive prices + explicit "what's included" + subscription pujas

## Run it locally

```bash
npm install
cp .env.example .env          # then set POSTGRES_URL
npm run dev                   # http://localhost:3000
# or: npm run build && npm run start
```

`POSTGRES_URL` must point at any Postgres, e.g. `postgres://user:pass@localhost:5432/aastha`.
The schema and demo orders are created automatically on first request.

Lint: `npm run lint`.

## Deploy to Vercel

1. Push this repo to GitHub and **Import** it in Vercel (it auto-detects Next.js — no build config needed).
2. Add a database: **Storage → Create → Postgres** (Vercel Postgres, powered by Neon) — or attach an existing Neon database. This injects a `POSTGRES_URL` env var into the project automatically.
   - Using a different provider? Add `POSTGRES_URL` manually under **Settings → Environment Variables** (managed hosts need SSL, which `lib/db.js` enables automatically for non-localhost URLs).
3. **Deploy.** On the first request the app creates its tables and seeds the two demo orders. Booking a puja then persists to Postgres and is immediately trackable.

> Why Postgres and not a local SQLite file? Vercel runs API routes as serverless functions with a read-only, ephemeral filesystem — a file-based DB can't persist there. A managed Postgres is the serverless-correct choice.

## Repository layout

```
app/            # Next.js App Router pages + API routes
components/      # React components (Header, Footer, PujaBrowser, TrackClient, …)
lib/            # catalog.js (static data), db.js (Postgres layer), toast.js
legacy-static/  # the original dependency-free static prototype (kept for reference)
ANALYSIS.md     # competitive analysis + gap-closure plan
```

> Content (temples, priests, prices, orders) is **illustrative** for this concept build.
