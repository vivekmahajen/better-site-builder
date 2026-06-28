// Verified astrologer directory cards.
//
// DOCTRINE: shows ONLY neutral, verifiable signals (tradition, specialties,
// years active, self-published credentials, public profile). No Aastha-invented
// quality score or rating about a named human. Contact details render ONLY when
// the person consented (contact.contact_consent === true). Every card carries a
// one-click correction/removal path.

function ContactBlock({ contact }) {
  if (!contact || contact.contact_consent !== true) return null;
  const rows = [
    ["Phone", contact.phone], ["WhatsApp", contact.whatsapp], ["Email", contact.email],
  ].filter(([, v]) => v);
  if (!rows.length) return null;
  return (
    <ul className="astro-contact" style={{ listStyle: "none", padding: 0, margin: "8px 0 0", fontSize: ".85rem" }}>
      {rows.map(([k, v]) => (<li key={k}><strong>{k}:</strong> {v}</li>))}
    </ul>
  );
}

export default function AstroGrid({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="card reveal" style={{ textAlign: "center", padding: "2.5rem 1.5rem" }}>
        <div style={{ fontSize: "2rem" }}>🔮</div>
        <h3 style={{ marginTop: ".5rem" }}>Verified astrologer listings coming soon</h3>
        <p style={{ color: "var(--ink-soft)", maxWidth: "44ch", margin: ".5rem auto 0" }}>
          We only list real, credential-verified astrologers who have consented to be here —
          so this directory is being built carefully rather than filled with placeholders.
          Please check back shortly.
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-3">
      {items.map((a) => (
        <article className="card astro-card reveal" key={a.id}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <h3 style={{ margin: 0 }}>{a.name}</h3>
            <span className="badge" title="Verified from a cited source" style={{ fontSize: ".7rem" }}>✓ Verified</span>
          </div>
          {(a.tradition?.length || a.specialties?.length) && (
            <div className="spec">{[...(a.tradition || []), ...(a.specialties || [])].join(" • ")}</div>
          )}
          <div style={{ color: "var(--ink-soft)", fontSize: ".85rem", marginTop: 6 }}>
            {[a.city, a.state].filter(Boolean).join(", ")}
            {a.years_active ? ` · ${a.years_active} yrs active` : ""}
            {a.languages?.length ? ` · ${a.languages.join(", ")}` : ""}
          </div>
          {a.credentials?.length > 0 && (
            <p style={{ fontSize: ".82rem", margin: "8px 0 0" }}><strong>Credentials (self-published):</strong> {a.credentials.join("; ")}</p>
          )}
          {a.affiliations?.length > 0 && (
            <p style={{ fontSize: ".82rem", margin: "4px 0 0" }}><strong>Affiliations:</strong> {a.affiliations.join("; ")}</p>
          )}
          {a.consultation?.fee_range_inr && (
            <p className="rate" style={{ margin: "10px 0 0" }}>{a.consultation.fee_range_inr}<small style={{ fontWeight: 400, color: "var(--ink-soft)" }}> (approx.)</small></p>
          )}
          <ContactBlock contact={a.contact} />
          <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
            {a.public_profile && (
              <a className="btn btn-primary btn-sm" href={a.public_profile} target="_blank" rel="noopener noreferrer nofollow">Official profile ↗</a>
            )}
          </div>
          {a.correction_contact && (
            <p style={{ marginTop: 10, fontSize: ".75rem" }}>
              <a href={`mailto:${a.correction_contact}?subject=${encodeURIComponent(`Correction/removal request: ${a.name} (${a.id})`)}`} style={{ color: "var(--ink-soft)" }}>
                Request correction or removal
              </a>
            </p>
          )}
        </article>
      ))}
    </div>
  );
}
