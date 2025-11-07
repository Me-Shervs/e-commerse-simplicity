// CART PAGE SCRIPT
const cartContainer = document.querySelector(".cart-items");
const totalPriceEl = document.getElementById("total-price");
const clearBtn = document.querySelector(".clear-btn");
const checkoutBtn = document.querySelector(".checkout-btn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render cart
function renderCart() {
    cartContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalPriceEl.textContent = "0.00";
        updateCartCount();
        return;
    }

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="item-info">
            <h3>${item.name}</h3>
            <label>Size:</label>
            <select class="size-select">
            <option value="S" ${item.size === "S" ? "selected" : ""}>S</option>
            <option value="M" ${item.size === "M" ? "selected" : ""}>M</option>
            <option value="L" ${item.size === "L" ? "selected" : ""}>L</option>
            <option value="XL" ${item.size === "XL" ? "selected" : ""}>XL</option>
            </select>
            <p>₱${item.price.toFixed(2)}</p>
        </div>
        <div class="quantity-control">
            <button class="decrease">-</button>
            <span>${item.quantity}</span>
            <button class="increase">+</button>
        </div>
        <button class="remove-btn">Remove</button>
        `;

    div.querySelector(".increase").addEventListener("click", () => {
        item.quantity++;
        saveCart();
    });

    div.querySelector(".decrease").addEventListener("click", () => {
        if (item.quantity > 1) item.quantity--;
        else cart.splice(index, 1);
        saveCart();
    });

    div.querySelector(".remove-btn").addEventListener("click", () => {
        cart.splice(index, 1);
        saveCart();
    });

    // Handle size changes
    div.querySelector(".size-select").addEventListener("change", (e) => {
        item.size = e.target.value;
        saveCart();
    });


    cartContainer.appendChild(div);
    });

    totalPriceEl.textContent = total.toFixed(2);
    updateCartCount();
}

// Save changes
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// Clear all
clearBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear your cart?")) {
        cart = [];
        saveCart();
}
});

// Checkout
checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
}
    alert("Proceeding to checkout...");
});

// Update badge
function updateCartCount() {
    const icon = document.querySelector(".cart");
    if (!icon) return;
    let badge = document.querySelector(".cart-count");
    if (!badge) {
        badge = document.createElement("span");
        badge.className = "cart-count";
        icon.parentElement.appendChild(badge);
    }   
    badge.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
}

// Go back to shop when clicking the cart icon
document.querySelector(".cart").addEventListener("click", () => {
    window.location.href = "../index.html";
});

renderCart();
