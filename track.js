let selected = (new URLSearchParams(location.search).get("id") && CARGO.some(c => c.id === new URLSearchParams(location.search).get("id")))
  ? new URLSearchParams(location.search).get("id") : CARGO[0].id;

/* TRACK LIST */
function renderList(){
  const q = document.getElementById("q").value.trim().toLowerCase();
  const f = document.getElementById("f").value;
  const rows = CARGO.filter(c => {
    const hay = (c.id+" "+c.item+" "+c.from+" "+c.to+" "+c.where).toLowerCase();
    return (!q || hay.includes(q)) && (f === "all" || kind(c) === f);
  });
  const box = document.getElementById("list");
  if (!rows.length){ box.innerHTML = `<div class="empty">No cargo matches that search.</div>`; return; }
  box.innerHTML = rows.map(c => {
    const p = priceOf(c), k = kind(c);
    return `<button class="way ${c.id===selected?"sel":""}" data-id="${c.id}">
      <div class="top"><span class="id">${c.id}</span><span class="chip ${k}">${STAGES[c.stage]}</span></div>
      <div class="route">${c.from} <b>→</b> ${c.to}</div>
      <div style="font-size:14px;color:#39415F">${c.item} · ${c.mode}</div>
      <div class="meta">
        <div>Shipped<b>${fmt(c.departed)}</b></div>
        <div>Arrival<b>${fmt(c.eta)}</b></div>
        <div style="grid-column:1/-1">Location<b>${c.where}</b></div>
      </div>
      <div class="money"><span>${peso(p.cargo)} + ${peso(p.fee)} delivery</span><strong>${peso(p.total)}</strong></div>
    </button>`;
  }).join("");
}
document.getElementById("list").addEventListener("click", e => {
  const b = e.target.closest(".way"); if (!b) return;
  selected = b.dataset.id; renderList(); renderDetail();
  if (window.innerWidth < 980) document.getElementById("detail").scrollIntoView({behavior:"smooth",block:"start"});
});
document.getElementById("q").addEventListener("input", renderList);
document.getElementById("f").addEventListener("change", renderList);

/* MAP */
function mapSVG(c){
  let dots = "";
  for (let x = 20; x <= 420; x += 20) for (let y = 40; y <= 540; y += 20) dots += `<circle cx="${x}" cy="${y}" r="1.4" fill="#B5C3EA"/>`;
  const A = HUBS[c.from], B = HUBS[c.to];
  const cx = A.x + (B.x - A.x) * c.progress, cy = A.y + (B.y - A.y) * c.progress;
  const labels = Object.entries(HUBS).map(([n,h]) => {
    const on = n === c.from || n === c.to;
    return `<circle cx="${h.x}" cy="${h.y}" r="${on?6:4}" fill="${on?"#080B14":"#fff"}" stroke="#080B14" stroke-width="2"/>
      <text x="${h.x+(h.x>300?-10:10)}" y="${h.y+4}" text-anchor="${h.x>300?"end":"start"}" font-family="IBM Plex Mono,monospace" font-size="11" fill="${on?"#080B14":"#5A6385"}" font-weight="${on?600:400}">${n}</text>`;
  }).join("");
  const area = [["LUZON",150,60],["VISAYAS",250,282],["MINDANAO",270,455]].map(([t,x,y]) =>
    `<text x="${x}" y="${y}" font-family="Barlow Condensed,sans-serif" font-weight="800" font-size="30" fill="#1747FF" opacity=".16" letter-spacing="3">${t}</text>`).join("");
  return `<svg viewBox="0 0 440 560" role="img" aria-label="Route from ${c.from} to ${c.to}">
    ${dots}${area}
    <line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="#080B14" stroke-width="2" stroke-dasharray="5 6"/>
    <line x1="${A.x}" y1="${A.y}" x2="${cx}" y2="${cy}" stroke="#1747FF" stroke-width="4"/>
    ${labels}
    <circle class="ping" cx="${cx}" cy="${cy}" r="7" fill="#1747FF"/>
    <rect x="${cx-8}" y="${cy-8}" width="16" height="16" fill="#1747FF" stroke="#080B14" stroke-width="2.5" transform="rotate(45 ${cx} ${cy})"/>
  </svg>`;
}
function renderDetail(){
  const c = CARGO.find(x => x.id === selected), d = document.getElementById("detail");
  if (!c){ d.innerHTML = `<div class="empty">Select a cargo to see its route.</div>`; return; }
  const p = priceOf(c), z = zoneOf(c);
  d.innerHTML = `
    <div class="dh"><span>WAYBILL <strong>${c.id}</strong></span><span>${c.item.toUpperCase()}</span></div>
    <div class="mapbox">${mapSVG(c)}</div>
    <div class="facts">
      <div>Shipped<b>${fmt(c.departed)}</b></div>
      <div>Now at<b>${c.where}</b></div>
      <div>Arrival<b>${fmt(c.eta)}</b></div>
    </div>
    <div class="steps">${STAGES.map((s,i) => `<div class="step ${i<=c.stage?"on":""} ${i===c.stage?"now":""}"><i></i>${s}</div>`).join("")}</div>
    <div class="facts" style="border-top:2px solid var(--ink);margin-top:14px;border-bottom:0">
      <div>Cargo rate<b>${peso(p.cargo)}</b></div>
      <div>Delivery · ${z.name}<b>${peso(p.fee)}</b></div>
      <div>Total<b style="color:var(--blue)">${peso(p.total)}</b></div>
    </div>
    <div class="events"><h5>Movement log</h5>
      ${c.events.map(e => `<div class="ev"><time>${fmt(e[0])}</time><span>${e[1]}</span></div>`).join("")}
    </div>`;
}

renderList(); renderDetail();
