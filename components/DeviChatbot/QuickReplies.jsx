export default function QuickReplies({ replies, onSelect }) {
  return (
    <div className="devi-quick-replies" role="group" aria-label="Quick reply options">
      {replies.map((r, i) => (
        <button key={i} className="devi-quick-reply" onClick={() => onSelect(r.value)}>
          {r.label}
        </button>
      ))}
    </div>
  );
}
