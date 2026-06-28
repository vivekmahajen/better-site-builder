// Aastha Sacred Data Engine — read API for the app.
//
// DOCTRINE: anything user-facing must be `verified`. The `verified*()` helpers
// below filter to verification === "verified" so unsourced / needs_review rows
// can never leak into the UI or the Devi agent's recommendations.
import temples from "@/data/temples.json";
import pujas from "@/data/pujas.json";
import astrologers from "@/data/astrologers.json";
import priests from "@/data/priests.json";

const isVerified = (r) => r && r.verification === "verified";

// Temples are reference data (not claims about people). Expose all, plus lookup.
export const ALL_TEMPLES = temples;
export const templeById = (id) => temples.find((t) => t.id === id) || null;
export const verifiedTemples = () => temples.filter(isVerified);

// People + pujas: ONLY verified rows are ever returned to the UI.
export const verifiedPujas = () => pujas.filter(isVerified);
export const verifiedAstrologers = () => astrologers.filter(isVerified);
export const verifiedPriests = () => priests.filter(isVerified);

export const pujaById = (id) => verifiedPujas().find((p) => p.id === id) || null;

// Intent -> puja recommendation surface for the Devi AI Agent. Maps a devotee's
// stated need to the controlled puja categories, returning sourced pujas only
// (each still carries its own disclaimer for the agent to relay).
const INTENT_TO_CATEGORIES = {
  health: ["health_longevity"],
  longevity: ["health_longevity"],
  wealth: ["prosperity_wealth"],
  prosperity: ["prosperity_wealth"],
  career: ["prosperity_wealth", "victory_obstacle_removal"],
  protection: ["protection"],
  marriage: ["marriage_relationship"],
  relationship: ["marriage_relationship"],
  progeny: ["progeny"],
  children: ["progeny"],
  ancestors: ["ancestral_shraddha_pitru"],
  pitru: ["ancestral_shraddha_pitru"],
  education: ["education_knowledge"],
  knowledge: ["education_knowledge"],
  obstacles: ["victory_obstacle_removal"],
  dosha: ["dosha_nivaran", "graha_shanti_navagraha"],
  graha: ["graha_shanti_navagraha"],
  festival: ["festival_seasonal"],
  lifecycle: ["samskara_lifecycle"],
};

export function pujasForIntent(intent) {
  const cats = INTENT_TO_CATEGORIES[String(intent || "").toLowerCase().trim()] || [];
  if (!cats.length) return [];
  return verifiedPujas().filter((p) => (p.category || []).some((c) => cats.includes(c)));
}

// For a verified puja, where can it be performed (resolved temples) and which
// verified priests offer it (with official booking channel preferred over PII).
export function templesForPuja(pujaId) {
  const p = pujaById(pujaId);
  if (!p) return [];
  return (p.offered_at_temples || []).map(templeById).filter(Boolean);
}
export function priestsForPuja(pujaId) {
  return verifiedPriests().filter((pr) => (pr.services_offered || []).includes(pujaId));
}
