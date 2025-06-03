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

// Flash Sale Product Generator
const flashSaleItems = document.getElementById("flashSaleItems");
const productList = document.getElementById("productList");

const demoProducts = [
  { name: "keyboard", img: "assets/products/keyboard.jpg" },
  { name: "mouse", img: "assets/products/mouse.jpg" },
  { name: "rechargeble-fan", img: "assets/products/rechargeble-fan.jpg" },
  { name: "mobile", img: "assets/products/mobile.jpg" },
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
