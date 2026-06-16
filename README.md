# Aastha — a better devotional platform

A complete, dependency-free website built to **out-do [srimandir.com](https://www.srimandir.com)** by closing the gaps that real devotees complain about. See [`ANALYSIS.md`](./ANALYSIS.md) for the full competitive analysis (Sri Mandir vs VAMA vs Utsav) and the gap-by-gap closure plan.

## The one-line pitch

> **Sri Mandir's breadth + Utsav's prasad/subscription model + VAMA's live astrology — wrapped in radical transparency** (live order tracking, verified priests, clear pricing) that none of them offer.

## What's inside

| Page | Purpose |
| --- | --- |
| `index.html` | Home — hero, gap-closers, tracking demo, popular pujas, how-it-works, honest comparison table, testimonials |
| `pujas.html` | Browse pujas with category filters, all-inclusive pricing, "what's included", verified priests, subscription pujas |
| `track-order.html` | **The differentiator** — stage-by-stage live order tracking (try IDs `AAS-72401`, `AAS-68233`) |
| `live-darshan.html` | Live aarti/darshan schedule across temples |
| `astrology.html` | Book verified astrologers with transparent per-minute pricing |
| `daily.html` | Today's Panchang + free, ad-free aarti/chalisa/bhajan library |

## Gaps closed (vs Sri Mandir)

1. Opaque fulfilment → **live order tracking** with timestamps & SLAs
2. Unresponsive support → 24×7 human support with a published response SLA
3. Login/OTP defects → secure self-serve account with dual-OTP phone change
4. Wrong names / rushed pujas → **verified priests** + name-pronunciation confirmation + unhurried-ritual guarantee
5. No live darshan → dedicated **Live Darshan** page
6. Weak prasad logistics → courier-tracked prasad inside the order timeline
7. No live astrology → **Astrology** consultations
8. Opaque pricing → all-inclusive prices + explicit "what's included" + subscription pujas

## Tech

Pure **HTML + CSS + vanilla JS**. No build step, no frameworks, no external requests — works fully offline, so network policies can't break it. Shared design system in `assets/css/style.css`; demo data in `assets/js/data.js`; behaviour in `assets/js/main.js`.

## Run it locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

> Content (temples, priests, prices, orders) is **illustrative** for this concept build.
