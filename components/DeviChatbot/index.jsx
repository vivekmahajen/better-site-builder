"use client";
import { useState, useRef, useEffect } from "react";
import DeviAvatar from "./DeviAvatar";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import QuickReplies from "./QuickReplies";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useRouter } from "next/navigation";
import { speak, stopSpeaking, ttsSupported, sttSupported, createRecognizer } from "@/lib/voice";

export default function DeviChatbot() {
  const { t, lang, setLanguage } = useLanguage();
  const router = useRouter();
  const [voiceOn, setVoiceOn] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [mounted, setMounted] = useState(false);
  const recRef = useRef(null);
  const QUICK_REPLIES = [
    { label: t("devi.quick_replies.book_puja"), value: "I want to book a puja" },
    { label: t("devi.quick_replies.calculator"), value: "How does the free puja calculator work?" },
    { label: t("devi.quick_replies.darshan"), value: "When is the next live darshan?" },
    { label: t("devi.quick_replies.dosha"), value: "I think I have a dosha. Can you help?" },
    { label: t("devi.quick_replies.track"), value: "I want to track my puja order" },
    { label: t("devi.quick_replies.astrology"), value: "I want to book an astrology consultation" },
  ];
  const WELCOME_MESSAGE = { role: "assistant", content: t("devi.greeting_first"), timestamp: new Date() };

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

  const voiceOnRef = useRef(false);
  useEffect(() => { voiceOnRef.current = voiceOn; }, [voiceOn]);
  useEffect(() => {
    setMounted(true);
    try { if (localStorage.getItem("aastha_voice") === "1") setVoiceOn(true); } catch { /* no storage */ }
    return () => stopSpeaking();
  }, []);

  const toggleVoice = () => {
    setVoiceOn((v) => {
      const nv = !v;
      try { localStorage.setItem("aastha_voice", nv ? "1" : "0"); } catch { /* no storage */ }
      if (!nv) { stopSpeaking(); setSpeaking(false); }
      return nv;
    });
  };

  const startListening = () => {
    if (listening) { try { recRef.current?.stop(); } catch { /* ignore */ } setListening(false); return; }
    const r = createRecognizer(
      lang,
      (text) => { setListening(false); if (text) { setVoiceOn(true); try { localStorage.setItem("aastha_voice", "1"); } catch { /* */ } sendMessage(text, true); } },
      () => setListening(false),
    );
    if (!r) { return; }
    recRef.current = r;
    setListening(true);
    try { r.start(); } catch { setListening(false); }
  };

  const sendMessage = async (text, forceSpeak = false) => {
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
          lang,
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await response.json();
      (data.actions || []).forEach((a) => {
        if (!a) return;
        if ((a.type === "navigate" || a.type === "play_radio") && a.href) router.push(a.href);
        else if (a.type === "set_language" && a.lang) setLanguage(a.lang);
        else if (a.type === "schedule" && a.schedule) saveSchedule(a.schedule);
      });
      setMessages((prev) => [...prev, { role: "assistant", content: data.content, timestamp: new Date() }]);
      if ((forceSpeak || voiceOnRef.current) && data.content) {
        speak(data.content, lang, { onStart: () => setSpeaking(true), onEnd: () => setSpeaking(false) });
      }
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

  function saveSchedule(schedule) {
    try {
      const list = JSON.parse(localStorage.getItem("aastha_schedules") || "[]").filter((s) => !(s.songId === schedule.songId && s.time === schedule.time));
      list.push(schedule);
      localStorage.setItem("aastha_schedules", JSON.stringify(list));
    } catch { /* no storage */ }
    try { if ("Notification" in window && Notification.permission === "default") Notification.requestPermission(); } catch { /* ignore */ }
  }

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
          <span className="devi-trigger-name">{t("devi.name")}</span>
          <span className="devi-trigger-sub">{t("devi.title")}</span>
        </span>
        <span className="devi-pulse" aria-hidden />
      </button>

      {isOpen && (
        <div className="devi-window" role="dialog" aria-label="Chat with Devi">
          <div className="devi-header">
            {mounted && sttSupported() ? (
              <button className="devi-header-avatar" onClick={startListening} aria-label="Tap to talk to Devi" title="Tap to talk">
                <DeviAvatar size="header" />
              </button>
            ) : (
              <DeviAvatar size="header" />
            )}
            <div className="devi-header-info">
              <div className="devi-header-name">{t("devi.name")}</div>
              <div className="devi-header-status">
                <span className={`devi-online-dot ${speaking ? "speaking" : listening ? "listening" : ""}`} aria-hidden />
                {listening ? "Listening… 🎤" : speaking ? "Devi is speaking… 🔊" : `${t("devi.title")} • Online`}
              </div>
            </div>
            {mounted && ttsSupported() && (
              <button className="devi-voice-toggle" onClick={toggleVoice} aria-label={voiceOn ? "Turn Devi's voice off" : "Turn Devi's voice on"} title={voiceOn ? "Voice on" : "Voice off"}>
                {voiceOn ? "🔊" : "🔇"}
              </button>
            )}
            <button className="devi-close" onClick={() => { stopSpeaking(); setSpeaking(false); setIsOpen(false); }} aria-label="Close chat">✕</button>
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
            {mounted && sttSupported() && (
              <button
                className={`devi-mic ${listening ? "listening" : ""}`}
                onClick={startListening}
                aria-label={listening ? "Stop listening" : "Speak to Devi"}
                title={listening ? "Listening…" : "Speak to Devi"}
                type="button"
              >
                {listening ? "●" : "🎤"}
              </button>
            )}
            <textarea
              ref={inputRef}
              className="devi-input"
              placeholder={listening ? "Listening… speak now 🙏" : t("devi.placeholder")}
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
