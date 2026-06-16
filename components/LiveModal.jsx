"use client";
import { useEffect } from "react";
import { LIVE_FALLBACK_CHANNEL } from "@/lib/catalog";

export default function LiveModal({ item, onClose }) {
  // Close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!item) return null;

  const channel = item.channel || LIVE_FALLBACK_CHANNEL;
  // live_stream?channel= always resolves to the channel's CURRENT live broadcast,
  // so the embed never points at a stale/expired video id.
  const src = `https://www.youtube-nocookie.com/embed/live_stream?channel=${channel}&autoplay=1&mute=1&rel=0`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-video" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <h3><span className="live-pill" style={{ position: "static", marginRight: 8 }}><span className="dot pulse" />LIVE</span>{item.temple}</h3>
            <div className="temple">{item.ritual} · {item.city}</div>
          </div>
          <button className="modal-close" aria-label="Close" onClick={onClose}>×</button>
        </div>
        <div className="video-frame">
          <iframe
            src={src}
            title={`Live darshan — ${item.temple}`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <div className="modal-body" style={{ paddingTop: 14 }}>
          <p style={{ fontSize: ".84rem", color: "var(--ink-soft)", margin: 0 }}>
            Streaming the temple's official live darshan. If the aarti isn't live right now, the
            player shows the channel's next broadcast.{" "}
            <a href={`https://www.youtube.com/channel/${channel}/live`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--saffron-dark)", fontWeight: 700 }}>
              Open on YouTube ↗
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
