/* Aastha — UI behaviour */

/* ---- tiny helpers ---- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const checkIcon = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

function toast(msg) {
  let t = $(".toast");
  if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
  t.textContent = msg;
  requestAnimationFrame(() => t.classList.add("show"));
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("show"), 2600);
}

/* ---- mobile nav ---- */
function initNav() {
  const toggle = $(".nav-toggle"), links = $(".nav-links");
  if (toggle && links) toggle.addEventListener("click", () => links.classList.toggle("open"));
}

/* ---- scroll reveal ---- */
function initReveal() {
  const els = $$(".reveal");
  if (!("IntersectionObserver" in window) || !els.length) { els.forEach(e => e.classList.add("in")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(e => io.observe(e));
}

/* ---- render: pujas ---- */
function pujaCard(p) {
  return `<article class="card puja-card reveal" data-cat="${p.category}">
    <div class="pc-top">
      <div class="pc-emoji">${p.emoji}</div>
      <div><h3>${p.name}</h3><div class="temple">${p.temple}</div></div>
    </div>
    <div class="pc-body">
      <span class="badge-verified">${checkIcon} Verified priest · ${p.priest}</span>
      <ul class="pc-incl" style="margin-top:14px">
        ${p.incl.map(i => `<li>${checkIcon}<span>${i}</span></li>`).join("")}
      </ul>
    </div>
    <div class="pc-foot">
      <div class="price">₹${p.price.toLocaleString("en-IN")} <small>all inclusive</small></div>
      <button class="btn btn-primary btn-sm" data-book="${p.name}">Book puja</button>
    </div>
  </article>`;
}

function initPujas(limit) {
  const host = $("#puja-grid");
  if (!host) return;
  const data = limit ? PUJAS.slice(0, limit) : PUJAS;
  host.innerHTML = data.map(pujaCard).join("");

  // filter chips
  const chipHost = $("#puja-chips");
  if (chipHost) {
    chipHost.innerHTML = CATEGORIES.map((c, i) =>
      `<button class="chip ${i === 0 ? "active" : ""}" data-filter="${c}">${c}</button>`).join("");
    chipHost.addEventListener("click", (e) => {
      const b = e.target.closest(".chip"); if (!b) return;
      $$(".chip", chipHost).forEach(c => c.classList.remove("active"));
      b.classList.add("active");
      const f = b.dataset.filter;
      $$(".puja-card", host).forEach(card => {
        card.style.display = (f === "All" || card.dataset.cat === f) ? "" : "none";
      });
    });
  }
  host.addEventListener("click", (e) => {
    const b = e.target.closest("[data-book]"); if (b) toast(`🙏 "${b.dataset.book}" added — you'll get live tracking after checkout`);
  });
  initReveal();
}

/* ---- render: astrologers ---- */
function initAstro() {
  const host = $("#astro-grid"); if (!host) return;
  host.innerHTML = ASTROLOGERS.map(a => `
    <article class="card astro-card reveal">
      <div class="avatar">${a.initials}</div>
      <h3>${a.name}</h3>
      <div class="spec">${a.spec}</div>
      <div class="stars">${"★".repeat(Math.round(a.rating))}<span style="color:var(--ink-soft);font-size:.8rem"> ${a.rating} · ${a.exp} yrs</span></div>
      <p class="rate" style="margin:10px 0 14px">₹${a.rate}<small style="font-weight:400;color:var(--ink-soft)">/min</small></p>
      <button class="btn ${a.online ? "btn-primary" : "btn-ghost"} btn-sm btn-block" ${a.online ? "" : "disabled style=opacity:.55"}>
        ${a.online ? "<span class='online-dot'></span>Talk now" : "Currently offline"}
      </button>
    </article>`).join("");
  host.addEventListener("click", e => { const b = e.target.closest("button:not([disabled])"); if (b) toast("🔮 Connecting you to the astrologer…"); });
  initReveal();
}

/* ---- render: live darshan ---- */
function initLive() {
  const host = $("#live-grid"); if (!host) return;
  host.innerHTML = LIVE.map(l => `
    <article class="card live-card reveal">
      <div class="lc-thumb">
        <span class="om-big om">ॐ</span>
        ${l.live ? `<span class="live-pill"><span class="dot pulse"></span>LIVE</span>` : ""}
      </div>
      <div class="lc-body">
        <h3>${l.temple}</h3>
        <div class="meta">${l.ritual} · ${l.city}</div>
        <div style="display:flex;align-items:center;justify-content:space-between">
          <span class="viewers">${l.live ? `👁 ${l.viewers} watching` : `⏰ ${l.time}`}</span>
          <button class="btn ${l.live ? "btn-primary" : "btn-ghost"} btn-sm">${l.live ? "Watch" : "Remind me"}</button>
        </div>
      </div>
    </article>`).join("");
  host.addEventListener("click", e => { const b = e.target.closest("button"); if (b) toast(b.textContent.includes("Watch") ? "📿 Joining live darshan…" : "🔔 Reminder set"); });
  initReveal();
}

/* ---- order tracking (the differentiator) ---- */
function renderOrder(id) {
  const box = $("#track-result"); if (!box) return;
  const o = ORDERS[id.toUpperCase().trim()];
  if (!o) {
    box.classList.add("show");
    box.innerHTML = `<p style="text-align:center;color:var(--ink-soft)">No booking found for <b>${id}</b>. Try a demo ID: <b>AAS-72401</b> or <b>AAS-68233</b>.</p>`;
    return;
  }
  box.innerHTML = `
    <div class="track-meta">
      <div><div class="k">Puja</div><div class="v">${o.puja}</div></div>
      <div><div class="k">Temple</div><div class="v">${o.temple}</div></div>
      <div><div class="k">Priest</div><div class="v">${o.priest}</div></div>
      <div><div class="k">Status</div><div><span class="status-pill green">● ${o.status}</span></div></div>
    </div>
    <div class="timeline">
      ${o.steps.map(s => `
        <div class="tl-item ${s.state}">
          <span class="dot"></span>
          <h4>${s.t}</h4>
          <div class="time">${s.time}</div>
          ${s.note ? `<div class="note">${s.note}</div>` : ""}
        </div>`).join("")}
    </div>`;
  box.classList.add("show");
}

function initTracking() {
  const form = $("#track-form"); if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = $("#track-id").value;
    if (!id.trim()) { toast("Enter your booking ID"); return; }
    renderOrder(id);
  });
  $$("[data-demo]").forEach(b => b.addEventListener("click", () => {
    $("#track-id").value = b.dataset.demo; renderOrder(b.dataset.demo);
    $("#track-result").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }));
}

/* ---- panchang + player ---- */
function initDaily() {
  const pan = $("#panchang"); if (pan) pan.innerHTML = PANCHANG.map(p => `<div class="pan-item"><div class="k">${p.k}</div><div class="v">${p.v}</div></div>`).join("");
  const pl = $("#player"); if (pl) {
    pl.innerHTML = TRACKS.map(t => `
      <div class="track-row" data-t="${t.t}">
        <button class="play" aria-label="Play"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button>
        <div class="ti"><h4>${t.t}</h4><span>${t.sub}</span></div>
        <div class="dur">${t.dur}</div>
      </div>`).join("");
    pl.addEventListener("click", e => { const r = e.target.closest(".track-row"); if (r) toast(`▶ Now playing: ${r.dataset.t}`); });
  }
}

/* ---- footer year ---- */
function initYear() { const y = $("#year"); if (y) y.textContent = new Date().getFullYear(); }

document.addEventListener("DOMContentLoaded", () => {
  initNav(); initReveal(); initYear();
  initPujas(window.PUJA_LIMIT); initAstro(); initLive(); initTracking(); initDaily();
});
