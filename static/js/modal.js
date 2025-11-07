const modal = document.getElementById("productModal");
const closeModal = document.querySelector(".close");
const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const modalQuantity = document.getElementById("modalQuantity");
const modalSize = document.getElementById("modalSize");
const addToCartFromModal = document.getElementById("addToCartFromModal");

// Handle product click to open modal
document.querySelectorAll(".product").forEach(product => {
  product.addEventListener("click", () => {
    const name = product.dataset.name;
    const price = product.dataset.price;
    const image = product.dataset.image;

    modalImage.src = image;
    modalName.textContent = name;
    modalPrice.textContent = price;
    modalQuantity.value = 1;
    modalSize.value = "M"; // default size

    modal.classList.remove("hidden");
  });
});

// Close modal
closeModal.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

// Add to cart from modal
addToCartFromModal.addEventListener("click", () => {
  const name = modalName.textContent;
  const price = parseFloat(modalPrice.textContent);
  const image = modalImage.src;
  const quantity = parseInt(modalQuantity.value);
  const size = modalSize.value;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(i => i.name === name && i.size === size);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ name, price, image, quantity, size });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  modal.classList.add("hidden");

  // Optional popup feedback
  const pop = document.createElement("div");
  pop.textContent = `${name} (${size}) added to cart!`;
  pop.className = "cart-popup";
  document.body.appendChild(pop);
  setTimeout(() => pop.remove(), 1500);

  updateCartCount();
});
