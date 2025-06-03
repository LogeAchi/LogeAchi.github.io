// Flash Sale Countdown Timer
const countdown = document.getElementById("countdown");
let time = 3600; // 1 hour

function updateCountdown() {
  const mins = Math.floor(time / 60);
  const secs = time % 60;
  countdown.innerText = `⏳ ${mins}m ${secs}s left`;
  time--;
  if (time >= 0) setTimeout(updateCountdown, 1000);
}
updateCountdown();

}

  // Load flash sale
  const flashSaleEl = document.getElementById("flash-sale");
  if (flashSaleEl) {
    fetch("data/flash-sale.json")
      .then(res => res.json())
      .then(items => {
        flashSaleEl.innerHTML = items.map(item => \`
          <div class="product-card">
            <h4>\${item.name}</h4>
            <p>\${item.price}</p>
            <div class="countdown" data-endtime="\${item.endTime}">Loading...</div>
          </div>\`).join("");
        initCountdowns();
      });
  }
const demoProducts = [
  { name: "Mini Fan", img: "assets/products/keyboard.jpg" },
  { name: "USB Light", img: "assets/products/mouse.jpg" },
  { name: "Charger", img: "assets/products/rechargeble-fan.jpg" },
  { name: "Mobile ", img: "assets/products/mobile.jpg" },
];

function loadProducts() {
  demoProducts.forEach(p => {
    const html = `
      <div class="product">
        <img src="${p.img}" alt="${p.name}">
        <p>${p.name}</p>
        <button class="order-btn" onclick="orderNow('${p.name}')">Order Now</button>
      </div>`;
    flashSaleItems.innerHTML += html;
    productList.innerHTML += html;
  });
}
loadProducts();

// Order Now Button via WhatsApp
function orderNow(name) {
  const link = `https://wa.me/8801620301814?text=Hi! I want to order: ${name}`;
  window.open(link, "_blank");
}

// Real-time Search
document.getElementById("searchInput").addEventListener("input", function () {
  const value = this.value.toLowerCase();
  const products = document.querySelectorAll("#productList .product");
  products.forEach(p => {
    const name = p.innerText.toLowerCase();
    p.style.display = name.includes(value) ? "block" : "none";
  });
});
