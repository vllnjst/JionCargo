/* Rates & Fees page */
/* rates tables + calculator */
document.getElementById("t-size").innerHTML =
  `<tr><th>Cargo size</th><th class="p">Rate</th></tr>` +
  RATES.map(r => `<tr><td>${r.name}<small>${r.note}</small></td><td class="p">${peso(r.price)}</td></tr>`).join("");
document.getElementById("t-zone").innerHTML =
  `<tr><th>Delivery zone</th><th class="p">Fee</th></tr>` +
  ZONES.map(z => `<tr><td>${z.name}<small>${z.note}</small></td><td class="p">${peso(z.fee)}</td></tr>`).join("");
document.getElementById("c-size").innerHTML = RATES.map(r => `<option value="${r.id}">${r.name} (${r.note})</option>`).join("");
document.getElementById("c-zone").innerHTML = ZONES.map(z => `<option value="${z.id}">${z.name}</option>`).join("");
function calc(){
  const r = RATES.find(x => x.id === document.getElementById("c-size").value);
  const z = ZONES.find(x => x.id === document.getElementById("c-zone").value);
  const n = Math.max(1, parseInt(document.getElementById("c-qty").value) || 1);
  document.getElementById("o-cargo").textContent = peso(r.price * n);
  document.getElementById("o-fee").textContent = peso(z.fee * n);
  document.getElementById("o-total").textContent = peso((r.price + z.fee) * n);
}
["c-size","c-zone","c-qty"].forEach(id => document.getElementById(id).addEventListener("input", calc));
calc();
