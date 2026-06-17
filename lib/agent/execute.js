import { BHAKTI_CATALOG } from "@/lib/radio/catalog";
import { getPuja, PUJAS } from "@/lib/catalog";
import { getOrder } from "@/lib/db";

export function findPuja(name) {
  if (!name) return null;
  const n = name.toLowerCase().trim();
  return getPuja(n.replace(/\s+/g, "-"))
    || PUJAS.find((p) => p.name.toLowerCase() === n)
    || PUJAS.find((p) => n.includes(p.name.toLowerCase()))
    || PUJAS.find((p) => p.name.toLowerCase().includes(n))
    || PUJAS.find((p) => { const w = p.name.toLowerCase().split(/\s+/)[0]; return w.length > 4 && n.includes(w); })
    || null;
}

const CODE_TO_NAME = { hi: "Hindi", te: "Telugu", ta: "Tamil", bn: "Bengali", gu: "Gujarati", mr: "Marathi", ml: "Malayalam", pa: "Punjabi", kn: "Kannada", sa: "Sanskrit", or: "Odia" };

function pickSong(lang, deity) {
  const name = CODE_TO_NAME[lang] || "Hindi";
  const data = BHAKTI_CATALOG[name] || BHAKTI_CATALOG.Hindi;
  let songs = data.artists.flatMap((a) => a.songs.filter((s) => s.yt).map((s) => ({ ...s, artist: a.name })));
  if (deity) {
    const m = songs.filter((s) => (s.deity || "").toLowerCase().includes(deity.toLowerCase()) || (s.title || "").toLowerCase().includes(deity.toLowerCase()));
    if (m.length) songs = m;
  }
  return songs.length ? songs[Math.floor(Math.random() * songs.length)] : null;
}

// Returns { result } (fed back to the model) and optional { action } (run on the client).
export async function executeTool(name, input = {}) {
  switch (name) {
    case "play_radio": {
      const lang = CODE_TO_NAME[input.lang] ? input.lang : "hi";
      const song = pickSong(lang, input.deity);
      if (!song) return { result: { success: false, error: "no_song" } };
      const href = `/radio?lang=${lang}&song=${encodeURIComponent(song.id)}`;
      return {
        result: { success: true, song: song.title, artist: song.artist, lang, defaulted: lang !== input.lang },
        action: { type: "play_radio", href, title: song.title, artist: song.artist, lang },
      };
    }
    case "open_puja_calculator": {
      const p = new URLSearchParams();
      for (const k of ["name", "dob", "tob", "pob", "concern"]) if (input[k]) p.set(k, input[k]);
      if (input.name && input.dob && input.pob) p.set("auto", "1"); // enough to run the reading
      const qs = p.toString();
      return { result: { success: true, prefilled: Boolean(input.name), auto: Boolean(input.name && input.dob && input.pob) }, action: { type: "navigate", href: `/puja-calculator${qs ? `?${qs}` : ""}` } };
    }
    case "book_puja": {
      const p = findPuja(input.puja_name);
      if (!p) return { result: { success: true, note: "showing all pujas" }, action: { type: "navigate", href: "/pujas" } };
      const q = new URLSearchParams({ book: p.slug });
      if (input.devotee_name) q.set("devotee", input.devotee_name);
      if (input.gotra) q.set("gotra", input.gotra);
      if (input.family) q.set("family", input.family);
      if (input.confirm && input.devotee_name) q.set("auto", "1");
      return { result: { success: true, puja: p.name, price: p.price, confirming: Boolean(input.confirm && input.devotee_name) }, action: { type: "navigate", href: `/pujas?${q.toString()}` } };
    }
    case "open_live_darshan":
      return { result: { success: true }, action: { type: "navigate", href: "/live-darshan" } };
    case "show_dosha_info":
      return { result: { success: true, dosha: input.dosha_type || null }, action: { type: "navigate", href: "/dosha-nivaran" } };
    case "show_astrology":
      return { result: { success: true }, action: { type: "navigate", href: "/astrology" } };
    case "open_daan":
      return { result: { success: true }, action: { type: "navigate", href: "/daan" } };
    case "get_panchang":
      return { result: { success: true }, action: { type: "navigate", href: "/daily" } };
    case "set_user_language": {
      const lang = ["hi", "en"].includes(input.lang_code) ? input.lang_code : "en";
      return { result: { success: true, lang }, action: { type: "set_language", lang } };
    }
    case "track_order": {
      const id = (input.order_id || "").trim();
      if (!id) return { result: { success: false, needs_order_id: true }, action: { type: "navigate", href: "/track-order" } };
      try {
        const order = await getOrder(id);
        if (!order) return { result: { success: false, not_found: true, order_id: id }, action: { type: "navigate", href: `/track-order?id=${encodeURIComponent(id)}` } };
        const stage = (order.steps || []).filter((s) => s.state === "done").pop();
        return { result: { success: true, order_id: order.id, puja: order.puja, status: order.status, current_stage: stage?.title || "In progress" }, action: { type: "navigate", href: `/track-order?id=${encodeURIComponent(order.id)}` } };
      } catch {
        return { result: { success: false, error: "lookup_failed" }, action: { type: "navigate", href: "/track-order" } };
      }
    }
    case "show_puja_info": {
      const p = getPuja((input.puja_name || "").toLowerCase().replace(/\s+/g, "-")) || null;
      if (!p) return { result: { success: false, not_found: true }, action: { type: "navigate", href: "/pujas" } };
      return { result: { success: true, name: p.name, deity: p.deity, price: p.price, includes: p.incl }, action: { type: "navigate", href: "/pujas" } };
    }
    default:
      return { result: { success: false, error: "unknown_tool" } };
  }
}
