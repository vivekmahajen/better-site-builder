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
  // Prefer a pinned video id (a specific live stream) when provided — most reliable.
  // Otherwise fall back to the channel's "uploads" playlist (UC -> UU), which always
  // has playable content, unlike live_stream?channel= (often "unavailable").
  const src = item.videoId
    ? `https://www.youtube.com/embed/${item.videoId}?autoplay=1&mute=1&rel=0`
    : `https://www.youtube.com/embed/videoseries?list=${
        channel.startsWith("UC") ? "UU" + channel.slice(2) : channel
      }&autoplay=1&mute=1&rel=0`;
  const ytLink = item.videoId
    ? `https://www.youtube.com/watch?v=${item.videoId}`
    : `https://www.youtube.com/channel/${channel}/live`;

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
            Streaming the temple's live darshan. Trouble playing here?{" "}
            <a href={ytLink} target="_blank" rel="noopener noreferrer" style={{ color: "var(--saffron-dark)", fontWeight: 700 }}>
              open it on YouTube ↗
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
