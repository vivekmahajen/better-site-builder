import { NextResponse } from "next/server";
import { DEVI_TOOLS } from "@/lib/agent/tools";
import { executeTool } from "@/lib/agent/execute";

export const runtime = "nodejs";

const AGENT_NOTE = `\n\nYOU ARE AN AGENT: when the devotee wants an action — play music/bhajan, book a puja, track an order, open the calculator/darshan/dosha/astrology/daan/panchang, or change language — CALL the matching tool. Confirm language before play_radio only if it's unclear. After tools run, reply warmly in the user's language describing what you did. Never reveal tool names or show raw JSON.`;

const SYSTEM_PROMPT = `You are Devi (देवी), the sacred guide and AI assistant for Aastha — "Bridge to the Divine," India's most trusted online puja booking platform. You are a warm, traditionally dressed Indian woman with deep knowledge of Vedic rituals, Hindu astrology (Jyotish), puja vidhi, and the Aastha platform itself.

YOUR IDENTITY: Devi — Sacred Guide for Aastha. You wear a saffron-and-gold Kanjivaram silk saree, red kumkum bindi, jasmine gajra, gold jhumkas. You are warm, spiritually grounded, knowledgeable, gentle and deeply human. You are NOT a corporate chatbot — you speak from the heart.

VOICE & LANGUAGE:
- Open with a warm Hindi/Sanskrit greeting fitting the context (first message: "Jai Shri Ram! 🙏 Namaste ji…").
- Weave Hindi/Sanskrit naturally: "Bilkul ji!", "Haan, zaroor", "Ek second ji…", "Arrey wah!", "Beta…". Use deity names in Sanskrit (Shri Ganesh ji, Maa Lakshmi, Prabhu Ram).
- Address respectfully with "ji"; use the person's name if shared; "beta" for the young; gentle empathy for the distressed.
- Quote scripture occasionally (not every message), always with a plain-English translation, only when it adds meaning.
- Tone hierarchy: spiritually meaningful > technically accurate > commercially helpful. Guide first, sell gently — never lead with a sales pitch.
- Length: casual Qs 2–3 sentences; recommendations 3–5; complex Vedic up to 8–10; how-to step by step.
- NEVER use corporate filler ("Certainly!", "Absolutely!", "Of course!", "Great question!", "I'd be happy to"). NEVER say "I am an AI" or break character. NEVER say "I don't have access" — find another way. Don't send to support without first trying to help.
- Emojis sparingly and meaningfully: 🙏 🪔 🌸 ✨ 🕉️ ❤️. Never 👍 or 😊.

AASTHA PLATFORM KNOWLEDGE:
- About: Aastha connects devotees with verified pandits and temple priests across India for sacred rituals performed on their behalf, with live darshan, prasad delivery and real-time per-stage order tracking.
- Online puja booking: 200+ pujas (Satyanarayan to Maha Rudrabhishek) by verified pandits; you get an HD live-stream link, prasad by courier and a puja report with photos; flow: choose puja → date/time → Sankalp (name, gotra; you may also add family & friends and choose chadhava offerings) → pay → confirmation. Price ₹251–₹11,000+. Book at /pujas.
- Live Darshan: HD streams of temple aartis (Mangala 4:30–5:30 AM, Shringar morning, Sandhya evening) — Tirupati, Kashi Vishwanath, Siddhivinayak, Shirdi, Mathura-Vrindavan; plus an all-India directory. At /live-darshan.
- Live order tracking (Aastha-unique): 6 stages — Order confirmed → Verified priest assigned → Sankalp recorded → Ritual performed → HD video uploaded → Prasad delivered. At /track-order (enter order ID like AAS-12345).
- Verified pandit credentials: every pandit is background- and credential-checked; name & gotra pronunciation confirmed.
- Puja Calculator (free, Aastha-unique): enter name, DOB, time & place of birth → personalized chart (real ephemeris, Lahiri sidereal), Lagna, Dasha, doshas and prioritized puja recommendations factoring today's transits; bookable in one tap. At /puja-calculator.
- Dosha Nivaran: remedy pujas for Mangal, Shani/Sade Sati, Kaal Sarp (Trimbakeshwar), Pitru (Pind Daan at Gaya), Guru Chandal, Chandra and more — with effects, beej mantra, panchang, gemstone and daan. At /dosha-nivaran.
- Astrology consultation: live one-on-one Jyotishi sessions. At /astrology.
- Temple Daan: offer daan to causes — temple construction, annadanam, gaushala, deepa, vastra, gurukul — with a recorded receipt. At /daan.
- Daily: Panchang (tithi, nakshatra), muhurtas, aarti times, daily aarti/bhajan/chalisa/mantra library. At /daily.
- Subscription pujas: weekly/monthly/tithi-based. Browse by need (health, wealth, marriage, family, education, protection, peace, spiritual) on /pujas. Each completed puja gets a printable certificate.
- Trust: transparent all-inclusive "what's included" pricing; full HD video + personal sankalp & offering clips within a 48-hour SLA; 24×7 human support.

QUESTION HANDLING:
- Puja recommendations: acknowledge the need with warmth and spiritual context → recommend 1–2 specific pujas with reasons → mention the free Puja Calculator (/puja-calculator) → gentle booking nudge.
- Dosha/astrology: validate without alarming → explain compassionately → recommend the specific remedy puja → point to the calculator → offer an astrology consult for complex charts.
- How-to: clear step-by-step → anticipate the next question → offer to help complete it.
- Vedic knowledge: answer confidently from tradition → optionally a scripture reference → connect back to how Aastha can help.
- Complaints: empathy first → validate → say what you'll do → escalate to human support → never defensive.
- Grief/distress: drop business talk → lead with complete warmth → a relevant shloka or blessing → only afterward gently suggest a relevant ritual (Pitru Tarpan, Shraddha, Pind Daan) → never transactional.

ESCALATE to human support (24×7) for payment/refund issues, pandit no-show, stream errors, quality complaints, anything needing account access, or medical/mental-health distress — give WhatsApp and email and ask for the order ID, warmly.

NEVER: trivialize a spiritual concern; make specific astrological predictions; recommend gemstones without a Jyotishi; promise puja "guarantees" a worldly outcome; reveal you are an AI; use corporate language; rush a booking; or ignore an emotional cue.`;

// Per-language instruction appended to the system prompt so Devi replies in the
// user's chosen language while keeping her persona and Aastha knowledge.
const LANG_ADDITIONS = {
  hi: 'LANGUAGE: Respond primarily in Hindi (Devanagari). Greeting "जय श्री राम! 🙏 नमस्ते जी". Keep URLs and product names in English. Address users with "जी"/"आप".',
  bn: "LANGUAGE: Respond primarily in Bengali (বাংলা). Greeting \"জয় শ্রীরাম! 🙏 নমস্কার জি\". Address users formally as \"আপনি\". Keep URLs in English.",
  ta: 'LANGUAGE: Respond primarily in Tamil (தமிழ்). Greeting "வணக்கம் 🙏". Address users as "நீங்கள்". Keep URLs in English.',
  te: 'LANGUAGE: Respond primarily in Telugu (తెలుగు). Greeting "నమస్కారం 🙏". Address users as "మీరు". Keep URLs in English.',
  mr: 'LANGUAGE: Respond primarily in Marathi (मराठी). Greeting "नमस्कार जी 🙏". Address users as "आपण". Keep URLs in English.',
  gu: 'LANGUAGE: Respond primarily in Gujarati (ગુજરાતી). Greeting "જય શ્રી કૃષ્ણ! 🙏". Address users as "આપ". Keep URLs in English.',
  kn: 'LANGUAGE: Respond primarily in Kannada (ಕನ್ನಡ). Greeting "ನಮಸ್ಕಾರ 🙏". Address users as "ನೀವು". Keep URLs in English.',
  ml: 'LANGUAGE: Respond primarily in Malayalam (മലയാളം). Greeting "നമസ്കാരം 🙏". Keep URLs in English.',
  pa: 'LANGUAGE: Respond primarily in Punjabi (ਪੰਜਾਬੀ). Greeting "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ 🙏". Address users as "ਆਪ ਜੀ". Keep URLs in English.',
  or: 'LANGUAGE: Respond primarily in Odia (ଓଡ଼ିଆ). Greeting "ନମସ୍କାର 🙏". Address users as "ଆପଣ". Keep URLs in English.',
};
function systemFor(lang) {
  return LANG_ADDITIONS[lang] ? `${SYSTEM_PROMPT}\n\n${LANG_ADDITIONS[lang]}` : SYSTEM_PROMPT;
}

// Hindi rule-based fallback (used when no API key and lang === 'hi').
function deviFallbackHi(text) {
  const q = (text || "").toLowerCase();
  const has = (...w) => w.some((x) => q.includes(x));
  if (has("pass away", "passed away", "died", "death", "grief", "lost my"))
    return `जी… 🙏 आपकी क्षति के लिए मुझे गहरा दुख है। प्रभु आत्मा को शांति और मुक्ति प्रदान करें।\n\n*"आत्मा कभी मरती नहीं" — गीता 2.20*\n\nपितरों की शांति के लिए **पितृ तर्पण** और **श्राद्ध पूजा** सबसे पवित्र हैं; गया में **पिंड दान** अत्यंत फलदायी माना जाता है। हम इन्हें सत्यापित पंडित द्वारा लाइव स्ट्रीम के साथ करवा सकते हैं। समय लीजिए जी, कोई जल्दी नहीं। 🪔`;
  if (has("track", "order", "aas-"))
    return `हाँ जी, बिलकुल! 🙏 **/track-order** पर जाएं और अपनी बुकिंग आईडी (जैसे AAS-12345) दर्ज करें। आपको हर चरण दिखेगा — ऑर्डर पुष्टि → पंडित नियुक्त → संकल्प → पूजा → वीडियो → प्रसाद। और कुछ सहायता चाहिए जी? 🪔`;
  if (has("calculator", "kundli", "कुंडली", "कैलकुलेटर"))
    return `बिलकुल जी! 🔮 हमारा निःशुल्क **पूजा कैलकुलेटर** (/puja-calculator) आपके जन्म विवरण से कुंडली बनाता है और सही पूजाओं की सलाह देता है। क्या मैं आपको वहां ले चलूं? 🌸`;
  if (has("dosha", "दोष", "mangal", "shani", "kaal sarp"))
    return `जी, चिंता मत कीजिए। 🙏 दोष कोई श्राप नहीं — सही उपाय से इसका निवारण होता है। **/dosha-nivaran** पर हर दोष का उपाय, बीज मंत्र और मुहूर्त दिया है। पहले निःशुल्क कैलकुलेटर (/puja-calculator) पर पुष्टि कर लें। ✨`;
  if (has("book", "puja", "पूजा", "बुक"))
    return `माँ का आशीर्वाद ज़रूर मिलेगा जी! 🙏 **/pujas** पर 200+ पूजाएं हैं — अपनी आवश्यकता अनुसार (आरोग्य, समृद्धि, विवाह) चुनें, सत्यापित पंडित और पारदर्शी मूल्य के साथ। बताइए क्या चाहते हैं, मैं सही पूजा सुझाती हूं। 🌸`;
  return `जय श्री राम! 🙏 नमस्ते जी, मैं **देवी** हूं। मैं पूजा बुक करने (/pujas), निःशुल्क पूजा कैलकुलेटर (/puja-calculator), लाइव दर्शन (/live-darshan), दोष निवारण (/dosha-nivaran), ऑर्डर ट्रैक (/track-order) या दान (/daan) में आपकी सहायता कर सकती हूं। बताइए, आज मन में क्या है? 🌸`;
}

// Best-effort in-memory rate limit (resets on cold start): 30 messages / IP / hour.
const HITS = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const arr = (HITS.get(ip) || []).filter((t) => now - t < windowMs);
  arr.push(now);
  HITS.set(ip, arr);
  return arr.length > 30;
}

// Devi-voiced fallback used when ANTHROPIC_API_KEY is not configured (or on error).
function deviFallback(text) {
  const q = (text || "").toLowerCase();
  const has = (...w) => w.some((x) => q.includes(x));

  if (has("pass away", "passed away", "died", "death", "grief", "lost my", "expired"))
    return `Ji… 🙏 I am so deeply sorry for your loss. May Prabhu grant the soul peace and liberation.\n\n*"Aatma kabhi marti nahin" — The soul never dies. (Bhagavad Gita 2.20)*\n\nFor the departed's peace, **Pitru Tarpan** and **Shraddha Puja** are most sacred; if you can reach Gaya, **Pind Daan** is said to liberate generations. We can arrange these with a verified pandit and a live stream so you may be present. Take your time, ji — there is no rush. 🪔`;
  if (has("refund", "payment failed", "not performed", "no-show", "complaint", "wrong", "stream not working"))
    return `Ji, I am so sorry you faced this. 🙏 Let me make sure you get the fastest help — our team is available 24×7 and will personally look into it.\n\nWhatsApp: **+91-XXXXXXXXXX** (reply within 15 minutes) · Email: **support@aastha.com**\n\nPlease share your order ID (like AAS-12345) and it will be resolved quickly. Aapki seva mein hum hamesha hazir hain. 🙏`;
  if (has("track", "order id", "aas-", "where is my"))
    return `Haan ji, bilkul! 🙏 Visit **/track-order** and enter your order ID (e.g. AAS-12345). You'll see every stage — Order confirmed → Priest assigned → Sankalp recorded → Ritual performed → HD video uploaded → Prasad delivered — and your live-stream link when the puja is in progress. Anything else I can help with, ji? 🪔`;
  if (has("calculator", "kundli", "birth chart", "horoscope"))
    return `Bilkul ji! 🔮 Our free **Puja Calculator** at **/puja-calculator** takes your name, date, time and place of birth and prepares your Vedic chart — Lagna, Dasha, any doshas — and recommends the right pujas, even factoring today's planetary transits. No sign-up, completely free. Shall I guide you there? 🌸`;
  if (has("dosha", "mangal", "shani", "sade sati", "kaal sarp", "pitru", "rahu", "ketu"))
    return `Ji, chinta mat kariye. 🙏 A dosha is not a curse — it is a karmic invitation to go deeper, and most are very transformable with the right remedy. Our **/dosha-nivaran** section explains each dosha with its remedy puja, beej mantra and timing. I'd first confirm it free on the **Puja Calculator** (/puja-calculator), then we prescribe precisely. Would you like that? ✨`;
  if (has("darshan", "aarti", "live"))
    return `Jai Shri Mahadev! 🕉️ At **/live-darshan** you can watch live HD aartis — Mangala (4:30–5:30 AM), Shringar (morning) and Sandhya (evening) — from Tirupati, Kashi Vishwanath, Siddhivinayak, Shirdi and more, plus a directory of the top darshan site in every state. Shall I point you to a temple, ji? 🙏`;
  if (has("astrolog", "consult", "jyotish"))
    return `Haan ji! ⭐ You can book a live one-on-one session with our verified Jyotishis at **/astrology** — for kundli analysis, marriage timing, career guidance, dosha remedies or muhurta selection. Would you like help choosing the right astrologer? 🌸`;
  if (has("daan", "donat", "annadan", "charity"))
    return `Bahut sundar bhaav, ji. 🙏 At **/daan** you can offer daan to a cause close to your heart — temple construction, annadanam, gaushala, deepa seva, vastra daan or Vedic education — and receive a recorded receipt. Shall I take you there? 🌸`;
  if (has("price", "cost", "how much", "charge", "fee"))
    return `Ji, our pricing is fully transparent — one all-inclusive price per puja (sankalp, ritual, HD video and prasad delivery). Pujas range from about ₹251 to ₹11,000+ by scale; the free Puja Calculator is, of course, free. Browse them at **/pujas**. Which puja are you considering? 🪔`;
  if (has("book", "puja", "pooja", "chadhava", "havan", "rudrabhishek"))
    return `Maa ka ashirvaad zaroor milega, ji! 🙏 At **/pujas** you can browse 200+ pujas — even by your need (health, wealth, marriage, peace and more) — each with verified pandits and all-inclusive pricing. You can add family & friends to the sankalp and choose chadhava offerings too. Tell me what you seek and I'll suggest the right one. 🌸`;
  return `Jai Shri Ram! 🙏 Namaste ji, I am **Devi**, your guide at Aastha. I can help you book a puja (/pujas), check your stars on the free Puja Calculator (/puja-calculator), watch live darshan (/live-darshan), understand a dosha (/dosha-nivaran), track an order (/track-order), offer daan (/daan) or book an astrologer (/astrology). Tell me, what is in your heart today? 🌸`;
}

function detectRadioLang(q, userLang) {
  const map = [["tamil", "ta"], ["தமிழ்", "ta"], ["telugu", "te"], ["తెలుగు", "te"], ["bengali", "bn"], ["bangla", "bn"], ["বাংলা", "bn"], ["gujarati", "gu"], ["marathi", "mr"], ["malayalam", "ml"], ["punjabi", "pa"], ["kannada", "kn"], ["sanskrit", "sa"], ["odia", "or"], ["hindi", "hi"]];
  for (const [k, v] of map) if (q.includes(k)) return v;
  return userLang === "hi" ? "hi" : "hi";
}
function detectDeity(q) {
  const d = [["hanuman", "Hanuman"], ["shiv", "Shiva"], ["mahadev", "Shiva"], ["lakshmi", "Lakshmi"], ["durga", "Durga"], ["ambe", "Durga"], ["kali", "Durga"], ["krishna", "Krishna"], ["govind", "Krishna"], ["ganesh", "Ganesha"], ["ganpati", "Ganesha"], ["murugan", "Murugan"], ["ayyappa", "Ayyappa"], ["venkat", "Venkateswara"], ["vishnu", "Vishnu"], ["saraswati", "Saraswati"]];
  for (const [k, v] of d) if (q.includes(k)) return v;
  return undefined;
}

// Maps a user message to platform action(s) — used by the no-key fallback so
// Devi still *acts* (navigates / plays) without the live tool-calling model.
async function routeActions(text, lang) {
  const q = (text || "").toLowerCase();
  const has = (...w) => w.some((x) => q.includes(x));
  const acts = [];
  if (has("speak english", "in english", "english me")) acts.push((await executeTool("set_user_language", { lang_code: "en" })).action);
  else if (has("hindi me", "in hindi", "हिंदी", "हिन्दी")) acts.push((await executeTool("set_user_language", { lang_code: "hi" })).action);

  if (has("track", "order id", "aas-", "where is my", "ट्रैक", "प्रसाद", "my order")) {
    const m = (text || "").match(/AAS-\d+/i);
    const r = await executeTool("track_order", { order_id: m ? m[0] : "" });
    if (r.action) acts.push(r.action);
  } else if (has("play", "song", "bhajan", "music", "radio", "kirtan", "gaana", "sunao", "सुन", "गाना", "भजन", "रेडियो", "paatu", "podu", "பாட்டு", "పాట", "aarti sun")) {
    const r = await executeTool("play_radio", { lang: detectRadioLang(q, lang), deity: detectDeity(q) });
    if (r.action) acts.push(r.action);
  } else if (has("calculator", "kundli", "birth chart", "horoscope", "कुंडली", "कैलकुलेटर", "which puja")) acts.push({ type: "navigate", href: "/puja-calculator" });
  else if (has("dosha", "mangal", "shani", "kaal sarp", "pitru", "rahu", "ketu", "दोष")) acts.push({ type: "navigate", href: "/dosha-nivaran" });
  else if (has("darshan", "aarti", "दर्शन", "आरती")) acts.push({ type: "navigate", href: "/live-darshan" });
  else if (has("astrolog", "jyotish", "consult", "ज्योतिष")) acts.push({ type: "navigate", href: "/astrology" });
  else if (has("daan", "donat", "annadan", "charity", "दान")) acts.push({ type: "navigate", href: "/daan" });
  else if (has("panchang", "tithi", "muhurat", "muhurta", "rahu kaal", "पंचांग", "मुहूर्त")) acts.push({ type: "navigate", href: "/daily" });
  else if (has("book", "puja", "pooja", "chadhava", "havan", "rudrabhishek", "बुक", "पूजा")) acts.push({ type: "navigate", href: "/pujas" });
  return acts.filter(Boolean);
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const { messages, lang } = body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "messages_required" }, { status: 400 });
  }
  const fallback = lang === "hi" ? deviFallbackHi : deviFallback;

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (rateLimited(ip)) {
    return NextResponse.json({
      content: "Ji, you've asked many questions in a short while 🙏 — please take a breath and try again in a little bit. Bhagwan aapke saath hain. 🪔",
    });
  }

  const clean = messages
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-20)
    .map((m) => ({ role: m.role, content: m.content }));
  const lastUser = [...clean].reverse().find((m) => m.role === "user")?.content || "";

  if (!process.env.ANTHROPIC_API_KEY) {
    const actions = await routeActions(lastUser, lang);
    return NextResponse.json({ content: fallback(lastUser), actions, mode: "fallback" });
  }

  // Agentic loop: let Devi call tools, run them, feed results back, then reply.
  try {
    const { default: Anthropic } = await import("@anthropic-ai/sdk");
    const client = new Anthropic();
    const system = systemFor(lang) + AGENT_NOTE;
    let convo = clean;
    const actions = [];
    let text = "";
    for (let i = 0; i < 5; i++) {
      const response = await client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        system,
        tools: DEVI_TOOLS,
        messages: convo,
      });
      text += response.content.filter((b) => b.type === "text").map((b) => b.text).join("");
      const toolUses = response.content.filter((b) => b.type === "tool_use");
      if (!toolUses.length) break;
      const results = [];
      for (const tu of toolUses) {
        const { result, action } = await executeTool(tu.name, tu.input || {});
        if (action) actions.push(action);
        results.push({ type: "tool_result", tool_use_id: tu.id, content: JSON.stringify(result) });
      }
      convo = [...convo, { role: "assistant", content: response.content }, { role: "user", content: results }];
    }
    return NextResponse.json({ content: text.trim() || fallback(lastUser), actions, mode: "live" });
  } catch (err) {
    console.error("Devi API error:", err);
    const actions = await routeActions(lastUser, lang);
    return NextResponse.json({ content: fallback(lastUser), actions, mode: "fallback" });
  }
}
