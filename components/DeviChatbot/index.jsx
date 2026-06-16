"use client";
import { useState, useRef, useEffect } from "react";
import DeviAvatar from "./DeviAvatar";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import QuickReplies from "./QuickReplies";

const QUICK_REPLIES = [
  { label: "🪔 Book a puja", value: "I want to book a puja" },
  { label: "🔮 Puja Calculator", value: "How does the free puja calculator work?" },
  { label: "📺 Live Darshan", value: "When is the next live darshan?" },
  { label: "🪐 I have a dosha", value: "I think I have a dosha. Can you help?" },
  { label: "📦 Track my order", value: "I want to track my puja order" },
  { label: "⭐ Astrology", value: "I want to book an astrology consultation" },
];

const WELCOME_MESSAGE = {
  role: "assistant",
  content: `Jai Shri Ram! 🙏 Namaste ji, I am **Devi** — your sacred guide here at Aastha, Bridge to the Divine.

Whether you seek a puja for peace, prosperity, or healing — or simply want to understand which ritual aligns with your stars — I am here to guide you with love.

*"Sarve bhavantu sukhinah" — May all beings be happy.* 🌸

Tell me, what brings you to our divine platform today?`,
  timestamp: new Date(),
};

export default function DeviChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText || isTyping) return;

    setInput("");
    setShowQuickReplies(false);
    const next = [...messages, { role: "user", content: userText, timestamp: new Date() }];
    setMessages(next);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.content, timestamp: new Date() }]);
    } catch {
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: "Ji, ek second — I seem to have a small connection issue. Please try again in a moment. 🙏",
        timestamp: new Date(),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <button
        className="devi-trigger"
        onClick={() => setIsOpen(true)}
        aria-label="Open Devi — your sacred guide"
        style={{ display: isOpen ? "none" : "flex" }}
      >
        <DeviAvatar size="trigger" />
        <span className="devi-trigger-label">
          <span className="devi-trigger-name">Devi</span>
          <span className="devi-trigger-sub">Your Sacred Guide</span>
        </span>
        <span className="devi-pulse" aria-hidden />
      </button>

      {isOpen && (
        <div className="devi-window" role="dialog" aria-label="Chat with Devi">
          <div className="devi-header">
            <DeviAvatar size="header" />
            <div className="devi-header-info">
              <div className="devi-header-name">Devi</div>
              <div className="devi-header-status">
                <span className="devi-online-dot" aria-hidden />
                Your Sacred Guide • Online
              </div>
            </div>
            <button className="devi-close" onClick={() => setIsOpen(false)} aria-label="Close chat">✕</button>
          </div>

          <div className="devi-messages" role="log" aria-live="polite">
            {messages.map((msg, i) => (
              <ChatMessage key={i} message={msg} />
            ))}
            {isTyping && <TypingIndicator />}
            {showQuickReplies && messages.length === 1 && (
              <QuickReplies replies={QUICK_REPLIES} onSelect={sendMessage} />
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="devi-input-row">
            <textarea
              ref={inputRef}
              className="devi-input"
              placeholder="Ask Devi anything... 🙏"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
              aria-label="Type your message"
            />
            <button
              className="devi-send"
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>

          <div className="devi-footer-note">
            🕉️ Powered by Aastha • <a href="/faq">FAQ</a>
          </div>
        </div>
      )}
    </>
  );
}
