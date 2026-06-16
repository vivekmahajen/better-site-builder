"use client";
import { useEffect, useRef } from "react";

export default function SpiritualBackground({ isPlaying }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    let animId;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.015 + 0.005,
      phase: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    function draw() {
      t += isPlaying ? 0.012 : 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const grad = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width * 0.8);
      grad.addColorStop(0, "#140a24"); grad.addColorStop(0.5, "#0c0618"); grad.addColorStop(1, "#07040f");
      ctx.fillStyle = grad; ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2, cy = canvas.height * 0.4;
      for (let ring = 1; ring <= 6; ring++) {
        ctx.beginPath(); ctx.arc(cx, cy, ring * 60, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(212,160,23,${0.015 * (7 - ring)})`; ctx.lineWidth = 0.5; ctx.stroke();
      }
      for (let petal = 0; petal < 12; petal++) {
        const angle = (petal / 12) * Math.PI * 2 + t * 0.1;
        const x1 = cx + Math.cos(angle) * 40, y1 = cy + Math.sin(angle) * 40;
        const x2 = cx + Math.cos(angle) * 100, y2 = cy + Math.sin(angle) * 100;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.bezierCurveTo(x1, y1, x2, y2, cx, cy);
        ctx.strokeStyle = "rgba(232,113,10,0.04)"; ctx.lineWidth = 8; ctx.stroke();
      }
      stars.forEach((s) => {
        s.phase += s.speed;
        const opacity = s.opacity * (0.5 + 0.5 * Math.sin(s.phase));
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,248,240,${opacity})`; ctx.fill();
      });
      if (isPlaying) {
        for (let i = 0; i < 5; i++) {
          const px = cx + Math.cos(t * (i + 1) * 0.3) * (80 + i * 30);
          const py = cy + Math.sin(t * (i + 1) * 0.3) * (50 + i * 20);
          ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245,200,66,${0.3 + 0.2 * Math.sin(t * 2)})`; ctx.fill();
        }
      }
      if (!reduce) animId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  return (
    <div className="spiritual-bg">
      <canvas ref={canvasRef} className="spiritual-canvas" aria-hidden="true" />
      <div className="diya-row" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <span key={i} className="diya-lamp" style={{ animationDelay: `${i * 0.3}s` }}>🪔</span>
        ))}
      </div>
    </div>
  );
}
