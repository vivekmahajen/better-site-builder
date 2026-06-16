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
  // Every channel exposes an "uploads" playlist whose id is the channel id with
  // the leading "UC" swapped for "UU". Embedding that always has playable content
  // (the channel's latest darshan/aarti videos) — unlike live_stream?channel=,
  // which YouTube now returns as "unavailable" whenever nothing is live right now.
  const uploads = channel.startsWith("UC") ? "UU" + channel.slice(2) : channel;
  const src = `https://www.youtube.com/embed/videoseries?list=${uploads}&autoplay=1&mute=1&rel=0`;

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
            Playing darshan & aarti from the temple's official channel. For the live broadcast when
            it's on air,{" "}
            <a href={`https://www.youtube.com/channel/${channel}/live`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--saffron-dark)", fontWeight: 700 }}>
              open the live stream on YouTube ↗
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
