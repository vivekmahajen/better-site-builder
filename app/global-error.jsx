"use client";

// Catches errors thrown in the root layout / providers so the app degrades
// gracefully instead of showing a blank "client-side exception" page.
export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "Georgia, 'Times New Roman', serif", background: "#fff8f0", color: "#2d1000", margin: 0, padding: "48px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontSize: 44 }}>🪔</div>
          <h1 style={{ color: "#7b1e1e", marginBottom: 6 }}>Something went wrong</h1>
          <p style={{ color: "#6b5b4f" }}>We hit an unexpected error while loading Aastha. Please try again.</p>
          <pre style={{ whiteSpace: "pre-wrap", textAlign: "left", background: "#fff", border: "1px solid #eaddc9", padding: 12, borderRadius: 8, fontSize: 12, overflow: "auto", color: "#7b1e1e" }}>
            {String(error?.message || error)}{error?.digest ? `\n\nDigest: ${error.digest}` : ""}
          </pre>
          <button onClick={() => reset()} style={{ marginTop: 16, padding: "10px 20px", background: "linear-gradient(135deg,#8B1A1A,#E8710A)", color: "#fff", border: "none", borderRadius: 999, cursor: "pointer", fontSize: 15 }}>
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
