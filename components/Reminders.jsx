"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const read = () => { try { return JSON.parse(localStorage.getItem("aastha_schedules") || "[]"); } catch { return []; } };

// Schedule OS-level notifications for the next few days via Notification Triggers
// (Chromium/Android) so reminders fire even when the tab is closed. Tapping the
// notification opens Aastha and plays the bhajan (the tap is a valid gesture).
async function scheduleTriggers() {
  if (typeof window === "undefined") return;
  if (!("serviceWorker" in navigator) || !("TimestampTrigger" in window)) return;
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  let reg;
  try { reg = await navigator.serviceWorker.ready; } catch { return; }
  const list = read();
  for (const s of list) {
    if (s.repeat !== "daily") continue;
    const [hh, mm] = s.time.split(":").map(Number);
    for (let d = 0; d < 4; d++) {
      const when = new Date();
      when.setHours(hh, mm, 0, 0);
      when.setDate(when.getDate() + d);
      if (when.getTime() < Date.now() + 5000) continue;
      const tag = `${s.id}-${when.toISOString().slice(0, 10)}`;
      try {
        await reg.showNotification("🕉️ Aastha", {
          tag, // same tag replaces — safe to re-run
          body: `Time for ${s.title} 🙏 — tap to play`,
          icon: "/icon.svg",
          badge: "/icon.svg",
          data: { href: s.href },
          showTrigger: new window.TimestampTrigger(when.getTime()),
        });
      } catch { /* trigger unsupported / blocked */ }
    }
  }
}

export default function Reminders() {
  const router = useRouter();

  // Register the service worker + (re)schedule trigger notifications.
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(() => scheduleTriggers()).catch(() => {});
    }
    const onChange = () => scheduleTriggers();
    window.addEventListener("aastha-schedules-changed", onChange);
    const hourly = setInterval(scheduleTriggers, 60 * 60 * 1000); // re-arm the rolling window
    return () => { window.removeEventListener("aastha-schedules-changed", onChange); clearInterval(hourly); };
  }, []);

  // In-tab fallback: while Aastha is open, play at the scheduled minute.
  useEffect(() => {
    const tick = () => {
      const list = read();
      if (!list.length) return;
      const now = new Date();
      const hhmm = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      const today = now.toISOString().slice(0, 10);
      let changed = false;
      const remaining = [];
      for (const s of list) {
        if (s.time === hhmm && s.lastFired !== today) {
          changed = true;
          try { if ("Notification" in window && Notification.permission === "granted") new Notification("🕉️ Aastha", { body: `Now playing: ${s.title}`, icon: "/icon.svg" }); } catch { /* ignore */ }
          router.push(s.href);
          if (s.repeat === "daily") remaining.push({ ...s, lastFired: today });
        } else {
          remaining.push(s);
        }
      }
      if (changed) { try { localStorage.setItem("aastha_schedules", JSON.stringify(remaining)); } catch { /* ignore */ } }
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [router]);

  return null;
}
