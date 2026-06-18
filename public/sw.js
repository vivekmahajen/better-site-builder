// Aastha service worker — handles scheduled bhajan reminders (Notification
// Triggers) so they fire even when the tab is closed, and opens/plays on tap.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const href = (e.notification.data && e.notification.data.href) || "/radio";
  e.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const c of all) {
      if ("focus" in c) { try { await c.navigate(href); } catch { /* cross-origin */ } return c.focus(); }
    }
    if (self.clients.openWindow) return self.clients.openWindow(href);
    return null;
  })());
});
