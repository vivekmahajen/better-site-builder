"use client";

// Page-level error boundary (renders inside the root layout).
export default function Error({ error, reset }) {
  return (
    <section className="page-hero">
      <div className="wrap" style={{ textAlign: "center" }}>
        <div style={{ fontSize: 44 }}>🪔</div>
        <h1>Something went wrong</h1>
        <p style={{ color: "var(--ink-soft)" }}>We hit an unexpected error. Please try again.</p>
        <pre style={{ whiteSpace: "pre-wrap", textAlign: "left", background: "#fff", border: "1px solid var(--line)", padding: 12, borderRadius: 8, fontSize: 12, maxWidth: 600, margin: "12px auto", overflow: "auto", color: "var(--maroon)" }}>
          {String(error?.message || error)}{error?.digest ? `\n\nDigest: ${error.digest}` : ""}
        </pre>
        <button className="btn btn-primary" onClick={() => reset()}>Reload</button>
      </div>
    </section>
  );
}
