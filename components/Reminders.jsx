"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Fires Devi's scheduled bhajans. Browsers can only play audio while a tab is
// open (and after a user gesture), so this runs whenever Aastha is open and
// triggers playback (+ a notification) at the scheduled time.
export default function Reminders() {
  const router = useRouter();
  useEffect(() => {
    const read = () => { try { return JSON.parse(localStorage.getItem("aastha_schedules") || "[]"); } catch { return []; } };
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
          try { if ("Notification" in window && Notification.permission === "granted") new Notification("🕉️ Aastha", { body: `Now playing: ${s.title}` }); } catch { /* ignore */ }
          router.push(s.href);
          if (s.repeat === "daily") { remaining.push({ ...s, lastFired: today }); }
          // 'once' schedules are dropped after firing
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
