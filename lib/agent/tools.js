// Devi agent tool definitions (Claude `tools` array). Trimmed to actions that
// map to real Aastha pages/data in this app.
export const DEVI_TOOLS = [
  {
    name: "play_radio",
    description:
      "Play a devotional song on Aastha Bhakti Radio. Use when the user wants music/bhajan/kirtan/aarti/mantra. Supported radio languages: hi, te, ta, bn, gu, mr, ml, pa, kn, sa (plus many more). If the requested language isn't available, fall back to hi.",
    input_schema: {
      type: "object",
      properties: {
        lang: { type: "string", description: "Radio language code (hi, te, ta, bn, gu, mr, ml, pa, kn, sa, …). Default hi." },
        deity: { type: "string", description: "Optional deity (Hanuman, Shiva, Lakshmi, Durga, Krishna, Ganesha, Murugan, Ayyappa, Venkateswara…)." },
      },
      required: ["lang"],
    },
  },
  { name: "open_puja_calculator", description: "Open the free Puja Calculator. If the user gives birth details, pass them so the form is filled and the reading runs automatically. Ask for name, date of birth (YYYY-MM-DD), and place of birth (city, country) — time of birth is optional but improves accuracy.", input_schema: { type: "object", properties: {
    name: { type: "string", description: "Full name." },
    dob: { type: "string", description: "Date of birth, YYYY-MM-DD." },
    tob: { type: "string", description: "Time of birth, HH:MM (24h), optional." },
    pob: { type: "string", description: "Place of birth — 'City, Country'." },
    concern: { type: "string", description: "Optional life concern: health, marriage, career, children, spiritual, obstacles, peace, prosperity, education, protection." },
  }, required: [] } },
  { name: "book_puja", description: "Open the Pujas page to book a puja/chadhava. Use when the user wants to book/perform/schedule a puja.", input_schema: { type: "object", properties: { puja_name: { type: "string", description: "Optional puja name." } }, required: [] } },
  { name: "track_order", description: "Look up a puja order's live status. Use when the user asks about their order/prasad/status. Needs an order id like AAS-12345.", input_schema: { type: "object", properties: { order_id: { type: "string", description: "Order id (AAS-#####)." } }, required: [] } },
  { name: "open_live_darshan", description: "Open Live Darshan (temple aartis + all-India directory).", input_schema: { type: "object", properties: { temple: { type: "string" } }, required: [] } },
  { name: "show_dosha_info", description: "Open Dosha Nivaran for a planetary dosha and its remedy puja.", input_schema: { type: "object", properties: { dosha_type: { type: "string", description: "e.g. mangal, shani, kaal_sarp, pitru, rahu, ketu." } }, required: [] } },
  { name: "show_astrology", description: "Open astrology consultation booking.", input_schema: { type: "object", properties: {}, required: [] } },
  { name: "open_daan", description: "Open Temple Daan (donate to a cause).", input_schema: { type: "object", properties: {}, required: [] } },
  { name: "get_panchang", description: "Open the Daily page with today's Panchang (tithi, nakshatra, muhurat, aarti times).", input_schema: { type: "object", properties: {}, required: [] } },
  { name: "set_user_language", description: "Set the user's site language. Only en and hi are fully wired today; others acknowledge but stay en.", input_schema: { type: "object", properties: { lang_code: { type: "string", enum: ["hi", "en"], description: "Language code." } }, required: ["lang_code"] } },
  { name: "show_puja_info", description: "Fetch details about a specific puja (price, deity, what's included).", input_schema: { type: "object", properties: { puja_name: { type: "string" } }, required: ["puja_name"] } },
];
