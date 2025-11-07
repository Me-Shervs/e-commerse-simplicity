// --- Cart setup ---
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Create or update the red number on the icon
  function updateCartCount() {
    const icon = document.querySelector("#cartIcon");
    if (!icon) return;
    let badge = document.querySelector(".cart-count");
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "cart-count";
      icon.parentElement.appendChild(badge);
    }
    badge.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Add-to-cart buttons
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const p = btn.closest(".product");
      const name = p.dataset.name;
      const price = parseFloat(p.dataset.price);
      const img = p.dataset.image;

      const found = cart.find(i => i.name === name);
      if (found) found.quantity++;
      else cart.push({ name, price, image: img, quantity: 1 });

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();

      // Nice quick feedback
      const pop = document.createElement("div");
      pop.textContent = `${name} added!`;
      pop.className = "cart-popup";
      document.body.appendChild(pop);
      setTimeout(() => pop.remove(), 1500);
    });
  });

  // Clicking cart icon → open cart.html
  document.getElementById("cartIcon").addEventListener("click", () => {
    window.location.href = "cart.html";
  });

  updateCartCount();

