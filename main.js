
document.addEventListener("DOMContentLoaded", () => {
  // Load banners
  const bannerEl = document.getElementById("banner");
  if (bannerEl) {
    fetch("data/banners.json")
      .then(res => res.json())
      .then(banners => {
        bannerEl.innerHTML = banners.map(b => \`
          <div class="banner-slide" style="background: #fff3e0; padding: 10px; margin: 5px; border-radius: 10px;">
            <h3>\${b.title}</h3><p>\${b.subtitle}</p>
          </div>\`).join("");
      });
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

  // Load products if JSON name matches filename
  const filename = location.pathname.split("/").pop().replace(".html", "");
  const contentEl = document.getElementById("product-list");
  if (contentEl && filename) {
    fetch(\`\${filename}.json\`)
      .then(res => res.json())
      .then(products => {
        contentEl.innerHTML = products.map(p => \`
          <div class="product-card">
            <h4>\${p.name}</h4><p>\${p.price}</p>
          </div>\`).join("");
      });
  }
});

function initCountdowns() {
  const countdownEls = document.querySelectorAll(".countdown");
  countdownEls.forEach(el => {
    const end = new Date(el.dataset.endtime).getTime();
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = end - now;
      if (diff <= 0) {
        el.textContent = "Expired";
        clearInterval(interval);
        return;
      }
      const hrs = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      el.textContent = \`\${hrs}h \${mins}m \${secs}s\`;
    }, 1000);
  });
}
