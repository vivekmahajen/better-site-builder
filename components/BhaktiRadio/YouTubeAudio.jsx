"use client";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

// Loads the YouTube IFrame API once and resolves when ready.
let apiPromise;
function loadAPI() {
  if (typeof window === "undefined") return Promise.reject(new Error("no_window"));
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  if (!apiPromise) {
    apiPromise = new Promise((resolve) => {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { if (typeof prev === "function") prev(); resolve(window.YT); };
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    });
  }
  return apiPromise;
}

// Hidden YouTube player that plays a video's audio under the custom radio UI.
// IMPORTANT: the IFrame API REPLACES the element it's given with an <iframe>.
// We therefore mount it on a div we create ourselves (a child of the React-owned
// host) so React never tracks the replaced node — avoiding "removeChild" crashes.
const YouTubeAudio = forwardRef(function YouTubeAudio({ videoId, isPlaying, volume, isMuted, onProgress, onEnded, onError }, ref) {
  const hostRef = useRef(null);
  const playerRef = useRef(null);
  const readyRef = useRef(false);
  const pollRef = useRef(null);

  useImperativeHandle(ref, () => ({
    seekTo: (s) => { try { playerRef.current?.seekTo(s, true); } catch { /* not ready */ } },
  }));

  const applyVol = () => {
    const p = playerRef.current;
    if (!p || !readyRef.current) return;
    try { if (isMuted || volume === 0) p.mute(); else { p.unMute(); p.setVolume(volume); } } catch { /* not ready */ }
  };

  // Create the player once per videoId (parent keys this component by videoId).
  useEffect(() => {
    let cancelled = false;
    const host = hostRef.current;
    const mount = document.createElement("div"); // YouTube will replace THIS, not host
    if (host) host.appendChild(mount);

    loadAPI().then((YT) => {
      if (cancelled || !host || !host.contains(mount)) return;
      playerRef.current = new YT.Player(mount, {
        width: "0", height: "0", videoId,
        playerVars: { autoplay: isPlaying ? 1 : 0, controls: 0, playsinline: 1, rel: 0 },
        events: {
          onReady: (e) => { readyRef.current = true; applyVol(); if (isPlaying) e.target.playVideo(); },
          onStateChange: (e) => { if (e.data === YT.PlayerState.ENDED) onEnded?.(); },
          onError: (e) => onError?.(e.data),
        },
      });
    }).catch(() => {});

    return () => {
      cancelled = true;
      clearInterval(pollRef.current);
      try { playerRef.current?.destroy(); } catch { /* already gone */ }
      playerRef.current = null;
      readyRef.current = false;
      // We only ever remove our own created child; React still owns `host`.
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  useEffect(() => {
    const p = playerRef.current;
    if (!p || !readyRef.current) return;
    try { if (isPlaying) p.playVideo(); else p.pauseVideo(); } catch { /* not ready */ }
  }, [isPlaying]);

  useEffect(() => { applyVol(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [volume, isMuted]);

  useEffect(() => {
    clearInterval(pollRef.current);
    pollRef.current = setInterval(() => {
      const p = playerRef.current;
      if (p && p.getDuration) onProgress?.(p.getCurrentTime() || 0, p.getDuration() || 0);
    }, 500);
    return () => clearInterval(pollRef.current);
  }, [onProgress]);

  return <div ref={hostRef} style={{ position: "absolute", width: 0, height: 0, left: -9999, top: 0, overflow: "hidden" }} aria-hidden />;
});

export default YouTubeAudio;
