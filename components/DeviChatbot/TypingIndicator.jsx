import DeviAvatar from "./DeviAvatar";

export default function TypingIndicator() {
  return (
    <div className="devi-typing">
      <DeviAvatar size="message" />
      <div className="devi-typing-bubble">
        <div className="devi-dot" />
        <div className="devi-dot" />
        <div className="devi-dot" />
      </div>
    </div>
  );
}
