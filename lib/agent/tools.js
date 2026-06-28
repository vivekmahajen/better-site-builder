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
  { name: "book_puja", description: "Open the Pujas page to book a puja/chadhava. Pass the puja name and, if the user gives them, the devotee name and gotra for the sankalp so the booking form is filled. Set confirm=true only when the user clearly says to confirm/book it.", input_schema: { type: "object", properties: {
    puja_name: { type: "string", description: "Puja name, e.g. Satyanarayan Puja, Rudrabhishek, Hanuman Puja." },
    devotee_name: { type: "string", description: "Name for the sankalp." },
    gotra: { type: "string", description: "Gotra (optional)." },
    family: { type: "string", description: "Other family/friends' names to include (optional)." },
    confirm: { type: "boolean", description: "true = auto-confirm the booking; otherwise just open it pre-filled for review." },
  }, required: [] } },
  { name: "track_order", description: "Look up a puja order's live status. Use when the user asks about their order/prasad/status. Needs an order id like AAS-12345.", input_schema: { type: "object", properties: { order_id: { type: "string", description: "Order id (AAS-#####)." } }, required: [] } },
  { name: "open_live_darshan", description: "Open Live Darshan (temple aartis + all-India directory).", input_schema: { type: "object", properties: { temple: { type: "string" } }, required: [] } },
  { name: "show_dosha_info", description: "Open Dosha Nivaran for a planetary dosha and its remedy puja.", input_schema: { type: "object", properties: { dosha_type: { type: "string", description: "e.g. mangal, shani, kaal_sarp, pitru, rahu, ketu." } }, required: [] } },
  { name: "show_astrology", description: "Open astrology consultation booking.", input_schema: { type: "object", properties: {}, required: [] } },
  { name: "open_daan", description: "Open Temple Daan (donate to a cause).", input_schema: { type: "object", properties: {}, required: [] } },
  { name: "get_panchang", description: "Open the Daily page with today's Panchang (tithi, nakshatra, muhurat, aarti times).", input_schema: { type: "object", properties: {}, required: [] } },
  { name: "set_user_language", description: "Set the user's site language. Only en and hi are fully wired today; others acknowledge but stay en.", input_schema: { type: "object", properties: { lang_code: { type: "string", enum: ["hi", "en"], description: "Language code." } }, required: ["lang_code"] } },
  { name: "show_puja_info", description: "Fetch details about a specific puja (price, deity, what's included).", input_schema: { type: "object", properties: { puja_name: { type: "string" } }, required: ["puja_name"] } },
  { name: "recommend_puja", description: "Recommend sourced pujas for a devotee's stated need or intent — e.g. health, longevity, wealth, prosperity, career, protection, marriage, progeny/children, ancestors/pitru, education, obstacles, dosha, graha. Returns verified pujas with their traditional significance and a required disclaimer. ALWAYS relay each puja's disclaimer; describe significance as faith/tradition and NEVER promise health, wealth, marriage or other guaranteed outcomes. If none are returned, gently point the devotee to browse all pujas.", input_schema: { type: "object", properties: {
    intent: { type: "string", description: "The devotee's need, e.g. health, wealth, marriage, progeny, ancestors, education, protection, obstacles, dosha, career." },
    deity: { type: "string", description: "Optional preferred deity to narrow results." },
  }, required: ["intent"] } },
  { name: "schedule_play", description: "Schedule a devotional song/chant to play at a set time, repeating daily by default (e.g. 'Vishnu Sahasranama at 6 AM every morning'). Give time as HH:MM (24h) and repeat 'daily' or 'once'.", input_schema: { type: "object", properties: {
    time: { type: "string", description: "Time as HH:MM 24h, e.g. 06:00." },
    repeat: { type: "string", enum: ["daily", "once"], description: "daily (default) or once." },
    song_title: { type: "string", description: "Song/chant name, e.g. 'Vishnu Sahasranama'." },
    deity: { type: "string", description: "Optional deity if no specific title." },
    lang: { type: "string", description: "Optional language code." },
  }, required: ["time"] } },
];
