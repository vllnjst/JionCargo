
const STAGES = ["Booked","Picked up","In transit","At hub","Out for delivery","Delivered"];
const peso = n => "₱" + Number(n).toLocaleString("en-PH");
const rate = id => RATES.find(r => r.id === id);
const zoneOf = c => ZONES.find(z => z.id === HUBS[c.to].zone);
const priceOf = c => { const cg = rate(c.sizeId).price, fee = zoneOf(c).fee; return {cargo:cg, fee, total:cg+fee}; };
const fmt = iso => new Date(iso).toLocaleString("en-PH",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit",hour12:true});
const kind = c => c.stage === 5 ? "done" : (c.stage === 3 || c.stage <= 1) ? "hold" : "go";
const kindLabel = {go:"In transit", hold:"At hub", done:"Delivered"};


document.querySelectorAll("[data-fill]").forEach(el => {
  const k = el.dataset.fill, v = CONTACT[k];
  if (k === "email") el.innerHTML = `<a href="mailto:${v}">${v}</a>`;
  else if (k === "phone") el.innerHTML = `<a href="tel:${v.replace(/\s/g,'')}">${v}</a>`;
  else el.textContent = v;
});
document.getElementById("yr").textContent = new Date().getFullYear();



(function(){
  const bits = CARGO.map(c => `<span><b>${c.id}</b> ${c.from} → ${c.to} · ${kindLabel[kind(c)].toUpperCase()}</span>`).join("");
  document.getElementById("ticker").innerHTML = bits + bits;
})();


if (document.getElementById("n-active")) {
  document.getElementById("n-active").textContent = CARGO.filter(c => c.stage < 5).length;
  document.getElementById("n-hubs").textContent = Object.keys(HUBS).length;
}
