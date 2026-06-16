const BARS = Array.from({ length: 24 }, (_, i) => i);

export default function AudioVisualizer({ isPlaying, color = "#D4A017" }) {
  return (
    <div className="visualizer" aria-hidden="true">
      {BARS.map((i) => {
        const h = 6 + Math.round(Math.abs(Math.sin(i * 1.7)) * 18) + (i % 3) * 2;
        const dur = (0.4 + ((i % 5) * 0.12)).toFixed(2);
        return (
          <span
            key={i}
            className={`viz-bar ${isPlaying ? "playing" : ""}`}
            style={{ "--h": `${h}px`, "--dur": `${dur}s`, "--delay": `${(i % 6) * 0.08}s`, background: isPlaying ? color : undefined }}
          />
        );
      })}
    </div>
  );
}
