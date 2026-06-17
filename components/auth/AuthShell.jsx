import Link from "next/link";

export default function AuthShell({ children, step = null, wide = false }) {
  return (
    <section className="auth-shell">
      <div className="auth-brand">
        <Link href="/" className="brand"><span className="mark om">ॐ</span><span>Aastha<small>Bridge to the divine</small></span></Link>
      </div>
      <div className={`auth-card ${wide ? "wide" : ""}`}>
        {step && (
          <div className="auth-steps" aria-label={`Step ${step} of 5`}>
            {[1, 2, 3, 4, 5].map((n) => <span key={n} className={`auth-dot ${n <= step ? "on" : ""}`} />)}
            <span className="auth-step-text">Step {step} of 5</span>
          </div>
        )}
        {children}
      </div>
      <p className="auth-foot">🛕 Secure sign-in · your details are used only for your pujas</p>
    </section>
  );
}
