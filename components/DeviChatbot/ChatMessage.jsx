import { useEffect, useState } from "react";
import DeviAvatar from "./DeviAvatar";

// Minimal, XSS-safe markdown: escape first, then apply a small whitelist.
function renderMarkdown(text) {
  const esc = String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return esc
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\b(https?:\/\/[^\s<]+|(?:www\.|aastha\.)[^\s<]+)/g, (m) => `<a href="${m.startsWith("http") ? m : "https://" + m}" target="_blank" rel="noopener noreferrer">${m}</a>`)
    .replace(/\n/g, "<br/>");
}

export default function ChatMessage({ message }) {
  const isAssistant = message.role === "assistant";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const formatTime = (ts) => (ts ? new Date(ts).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) : "");

  return (
    <div
      className={`devi-message ${message.role}`}
      style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(8px)", transition: "opacity 0.25s, transform 0.25s" }}
    >
      {isAssistant && <DeviAvatar size="message" />}
      <div>
        <div className={`devi-bubble ${message.role}`}>
          {isAssistant ? (
            <span dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }} />
          ) : (
            message.content
          )}
        </div>
        <div className="devi-timestamp">{formatTime(message.timestamp)}</div>
      </div>
    </div>
  );
}
