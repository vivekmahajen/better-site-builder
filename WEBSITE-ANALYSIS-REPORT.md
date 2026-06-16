# Website Analysis Report — Aastha vs Sri Mandir / VAMA / Utsav

> Generated with the **website-analyzer-builder** skill (Mode B — URL-vs-URL).
> **Source (improving):** Aastha (this repo)
> **References:** srimandir.com · vama.app · utsavapp.in
> **Date:** 2026-06-16
> **Status:** Phases 1–3 (analysis + gap report). **No build performed** — awaiting confirmation.

Note: reference fetches are 403/anti-bot blocked, so reference data is sourced from public search, app-store listings, and prior research this session. Marked ✅ present · ⚠️ partial/demo · ❌ absent.

---

## Phase 1A — Source Function Inventory (Aastha) — PRESERVATION MANIFEST

These already work and must be preserved in any future build:

- ✅ Online puja & chadhava booking (28-puja catalogue, verified-priest badges, "what's included", all-inclusive pricing) — `/pujas`
- ✅ **Live, DB-backed order tracking** (6-stage timeline, Postgres) — `/track-order`, `app/api/orders/[id]`
- ✅ Subscription pujas (weekly / tithi / annual shraddh) — `/pujas`
- ✅ Live Darshan (in-app YouTube players + all-India directory: top site per state/UT) — `/live-darshan`
- ✅ Astrology — verified astrologer listings, per-minute pricing — `/astrology`
- ✅ Dosha Nivaran — 12 doshas with effects, remedy puja, beej mantra, panchang, gemstone, daan; bookable remedies — `/dosha-nivaran`
- ✅ **Puja Calculator** — real-ephemeris sidereal chart (astronomy-engine + Lahiri), geocoded Lagna, Dasha, doshas; AI or rule-based reading; bookable, transit-aware recommendations — `/puja-calculator`
- ✅ Daily — Panchang + aarti/bhajan player — `/daily`
- ✅ Persistent backend — Postgres bookings/orders (`lib/db.js`), booking API
- ✅ Design system — saffron/maroon/gold + serif DNA (`app/globals.css`); responsive; reveal animations; toast system
- ✅ Honest comparison table + transparency messaging — homepage

---

## Phase 1B.3 — Feature Matrix

### Core devotional functionality
| Feature | Aastha | Sri Mandir | VAMA | Utsav | Gap? |
|---|---|---|---|---|---|
| Online puja & chadhava | ✅ | ✅ | ✅ | ✅ | No |
| Subscription pujas | ✅ | ⚠️ | ⚠️ | ✅ | No |
| Live darshan | ✅ | ❌ | ✅ | ✅ | No |
| Prasad delivery (real logistics) | ⚠️ demo | ✅ | ✅ | ✅ | **YES** |
| Live astrologer call/chat | ⚠️ demo | ✅ | ✅ | ✅ | **YES** |
| 5,000+ ad-free aarti/bhajan library | ⚠️ few | ✅ | ✅ | ⚠️ | **YES** |
| Personalised puja calculator (instant, bookable, transit-aware) | ✅ | ⚠️ paid report | ⚠️ via astro | ❌ | No (Aastha leads) |
| Per-stage live order tracking | ✅ | ❌ | ❌ | ❌ | No (Aastha leads) |

### Trust & social proof
| Feature | Aastha | Sri Mandir | VAMA | Utsav | Gap? |
|---|---|---|---|---|---|
| Verified-priest credentials shown | ✅ | ❌ | ❌ | ❌ | No (Aastha leads) |
| Transparent "what's included" pricing | ✅ | ❌ | ❌ | ❌ | No (Aastha leads) |
| Ratings / reviews (real) | ⚠️ placeholder | ✅ | ✅ | ✅ | **YES** |
| App-store social proof (40M+ etc.) | ⚠️ claimed | ✅ | ✅ | ✅ | minor |
| 24×7 human support with SLA | ✅ | ❌ | ❌ | ❌ | No (Aastha leads) |

### Accounts, payments, platform
| Feature | Aastha | Sri Mandir | VAMA | Utsav | Gap? |
|---|---|---|---|---|---|
| Real payment gateway | ❌ demo | ✅ | ✅ | ✅ | **YES (critical)** |
| User accounts / auth / login | ❌ | ✅ | ✅ | ✅ | **YES (critical)** |
| Mobile apps (iOS/Android) | ❌ web | ✅ | ✅ | ✅ | **YES** (out of web scope) |
| Multi-language / regional deities | ❌ EN | ✅ | ✅ | ⚠️ | **YES** |
| Push notifications / reminders | ❌ | ✅ | ✅ | ✅ | **YES** |

### SEO & content
| Feature | Aastha | Sri Mandir | VAMA | Utsav | Gap? |
|---|---|---|---|---|---|
| SEO meta / OG / Twitter | ⚠️ basic | ✅ | ✅ | ✅ | **YES** |
| JSON-LD schema (FAQ/Org/Product) | ❌ | ⚠️ | ⚠️ | ⚠️ | **YES** |
| Blog / content hub (gyan) | ❌ | ✅ | ✅ | ✅ | **YES** |
| FAQ section | ❌ | ⚠️ | ⚠️ | ⚠️ | **YES** |
| Sitemap / robots | ❌ | ✅ | ✅ | ✅ | **YES** |

### Conversion & platform niceties
| Feature | Aastha | Sri Mandir | VAMA | Utsav | Gap? |
|---|---|---|---|---|---|
| Live chat / chatbot widget | ❌ | ⚠️ | ⚠️ | ⚠️ | medium |
| Cookie consent / GDPR | ❌ | ⚠️ | ⚠️ | ⚠️ | medium |
| PWA / offline | ❌ | ⚠️ | ⚠️ | ⚠️ | low |
| Dark mode | ❌ | ⚠️ | ⚠️ | ⚠️ | low |

---

## Phase 1B.4 — Aastha advantages (PROTECT — do not dilute)
- ⭐ **Per-stage live order tracking** (DB-backed) — no competitor has it.
- ⭐ **Verified-priest credentials + name-pronunciation + unhurried-ritual** trust layer.
- ⭐ **Transparent all-inclusive "what's included" pricing.**
- ⭐ **Instant, free, transit-aware Puja Calculator → one-tap bookable & tracked** remedies.
- ⭐ **Dosha Nivaran** with bookable remedies and full shastra detail.
- ⭐ **All-India live-darshan directory** (top site per state/UT).

---

## Phase 3 — Gap Analysis (priority · effort)

### 🔴 Critical
1. **Real payment gateway** — Razorpay/Stripe checkout replacing the demo "Confirm & pay". *Effort L.* Sits alongside the existing booking flow.
2. **User accounts / auth** — phone-OTP or email login so bookings/orders attach to a user (also closes the "OTP/login security" complaints we targeted). *Effort L.*

### 🟠 High
3. **SEO foundation** — per-page metadata is partial; add OG/Twitter, JSON-LD (Organization, Product/Service, FAQ, BreadcrumbList), `sitemap.xml`, `robots.txt`. *Effort S–M.*
4. **FAQ section + schema** — common booking/puja questions with FAQPage JSON-LD. *Effort S.*
5. **Real aarti/bhajan library** — expand Daily into a browsable, categorised audio library. *Effort M.*
6. **Live astrologer consult** — real call/chat booking + slots (currently demo). *Effort L.*
7. **Multi-language** — at least Hindi; ideally regional. *Effort L.*

### 🟡 Medium
8. Real ratings/reviews on pujas & astrologers. *M.*
9. Prasad logistics integration (courier API) behind the existing tracking UI. *M.*
10. Live chat / help widget with the advertised SLA. *S–M.*
11. Cookie consent / privacy + terms pages. *S.*
12. Push/email reminders for tithis & subscription pujas. *M.*

### 🟢 Low
13. Dark mode · PWA/offline · changelog page.

### ⭐ Opportunities (none of the competitors do these well)
- Shareable chart/prescription cards; "puja streak"/sankalp journal; transit calendar that pre-fills the calculator; verified post-ritual video gallery as social proof.

---

## Summary
- **Aastha leads** on transparency, tracking, verified priests, dosha remedies, and the transit-aware calculator (its core differentiators — all preserved).
- **Remaining gaps vs competitors** are mostly *platform* concerns: real payments, accounts/auth, SEO/content, a full audio library, real astrologer calling, and multi-language.
- Counts: **2 critical · 5 high · 5 medium · 3 low · 4 opportunities.** Preserved features: **11.** Protected advantages: **6.**

**Next step (per skill): confirm which gaps to build (Critical+High or all), any to exclude, and framework (same Next.js). No code will be written until confirmed.**

---

## Reference addendum — PoojaKaro (poojakaro.app) · added 2026-06-16

Site is anti-bot blocked (403); assessment from public listings/search only.

**PoojaKaro positioning:** "Online Puja, Chadhava & **Free Astrology Services**" with **verified pandits**, temple rituals, and Vedic services performed from home.

| Feature | Aastha | PoojaKaro | Note |
|---|---|---|---|
| Online puja & chadhava | ✅ | ✅ | parity |
| Verified pandits | ✅ credentials shown | ✅ claimed | Aastha leads (shows credentials, pronunciation, SLA) |
| Free astrology / kundli | ✅ free Puja Calculator + Dosha Nivaran | ✅ "free astrology" | parity / Aastha leads (transit-aware, bookable) |
| Prasad delivery | ⚠️ demo | ✅ implied | already tracked as a gap |
| Per-stage live order tracking | ✅ | ❌ (not advertised) | Aastha leads |

**Conclusion:** PoojaKaro introduces **no new gaps** beyond those already in this report. Its main differentiator (free astrology) is already matched/exceeded by Aastha's free, transit-aware Puja Calculator. A full audit would need PoojaKaro's rendered HTML or screenshots (currently blocked).

---

## Reference addendum — DevaSeva (devaseva.com) · added 2026-06-16

Site anti-bot blocked (403); assessed from public listings/search.

**DevaSeva positioning:** trusted online seva platform — book sevas (Satyanarayana Vrat, Homams, Abhishekam) in name & gotra at famous temples, with these distinctive features:

| Feature | Aastha | DevaSeva | Action |
|---|---|---|---|
| Add family & friends' names to one seva | ❌ → ✅ added | ✅ | **BUILT** — multi-name sankalp on every booking |
| Temple donations / daan (construction, annadanam…) | ❌ → ✅ added | ✅ | **BUILT** — `/daan` with causes + recorded receipt |
| Live telecast of *your* seva | ⚠️ 48-hr video + generic live darshan | ✅ | Deferred (needs real streaming infra) |
| Devotional feed | ❌ | ✅ | Deferred (low priority) |
| Festive / seasonal sevas | ⚠️ via transit dropdown | ✅ | Deferred (can group existing pujas) |
| Per-stage live order tracking | ✅ | ❌ | Aastha leads |
| Verified-priest credentials | ✅ | ⚠️ | Aastha leads |
| Free transit-aware puja calculator | ✅ | ❌ | Aastha leads |

**Built this round:** multi-name sankalp (family & friends on a single booking, persisted + shown in the sankalp step) and Temple Daan (`/daan`). Deferred: live telecast of own seva, devotional feed, festive-seva grouping.
