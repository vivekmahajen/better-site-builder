"use client";
// Verified temple-priest directory.
//
// DOCTRINE: priests are grouped under their temple and the temple's OFFICIAL
// BOOKING CHANNEL is preferred over any personal contact. Personal contact
// renders ONLY with recorded consent (contact.contact_consent === true).
// Every card carries a one-click correction/removal path. Empty is fine —
// sparse-and-verified beats full-and-fake.
import { useTranslation } from "@/lib/i18n/useTranslation";

function ContactBlock({ contact }) {
  if (!contact || contact.contact_consent !== true) return null;
  const rows = [["Phone", contact.phone], ["WhatsApp", contact.whatsapp]].filter(([, v]) => v);
  if (!rows.length) return null;
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: "6px 0 0", fontSize: ".85rem" }}>
      {rows.map(([k, v]) => (<li key={k}><strong>{k}:</strong> {v}</li>))}
    </ul>
  );
}

export default function PriestGrid({ groups }) {
  const { t } = useTranslation();
  if (!groups || groups.length === 0) {
    return (
      <div className="card reveal" style={{ textAlign: "center", padding: "2.5rem 1.5rem" }}>
        <div style={{ fontSize: "2rem" }}>🛕</div>
        <h3 style={{ marginTop: ".5rem" }}>{t("directory.priest_empty_title")}</h3>
        <p style={{ color: "var(--ink-soft)", maxWidth: "46ch", margin: ".5rem auto 0" }}>
          {t("directory.priest_empty_body")}
        </p>
      </div>
    );
  }
  return (
    <div style={{ display: "grid", gap: 24 }}>
      {groups.map(({ temple, priests }) => (
        <section key={temple?.id || "unknown"}>
          <h2 style={{ marginBottom: 12 }}>{temple ? `${temple.name} — ${temple.city}, ${temple.state}` : "Temple"}</h2>
          <div className="grid grid-3">
            {priests.map((p) => (
              <article className="card reveal" key={p.id}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <h3 style={{ margin: 0 }}>{p.name}</h3>
                  <span className="badge" title="Verified from a cited source" style={{ fontSize: ".7rem" }}>✓ {t("directory.verified")}</span>
                </div>
                <div className="spec">{[p.role, ...(p.tradition || [])].filter(Boolean).join(" • ")}</div>
                {p.languages?.length > 0 && (
                  <div style={{ color: "var(--ink-soft)", fontSize: ".85rem", marginTop: 6 }}>{p.languages.join(", ")}</div>
                )}
                {p.official_booking_channel && (
                  <a className="btn btn-primary btn-sm" style={{ marginTop: 12 }} href={p.official_booking_channel} target="_blank" rel="noopener noreferrer nofollow">
                    {t("directory.book_via_temple")}
                  </a>
                )}
                <ContactBlock contact={p.contact} />
                {p.correction_contact && (
                  <p style={{ marginTop: 10, fontSize: ".75rem" }}>
                    <a href={`mailto:${p.correction_contact}?subject=${encodeURIComponent(`Correction/removal request: ${p.name} (${p.id})`)}`} style={{ color: "var(--ink-soft)" }}>
                      {t("directory.request_correction")}
                    </a>
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
