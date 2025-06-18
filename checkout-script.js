document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsList = document.getElementById("cart-items");
  const totalSpan = document.getElementById("cart-total");

  let total = 0;
  cartItemsList.innerHTML = "";

  if (cart.length === 0) {
    cartItemsList.innerHTML = "<li>Your cart is empty.</li>";
  } else {
    cart.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.quantity} x ${item.name} — $${item.price * item.quantity}`;
      cartItemsList.appendChild(li);
      total += item.price * item.quantity;
    });
    totalSpan.textContent = total.toFixed(2);
  }

  // Handle form submission
  const checkoutForm = document.getElementById("checkout-form");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you! Your order has been placed (mock checkout).");

      // Clear cart and redirect or show message
      localStorage.removeItem("cart");
      window.location.href = "index.html";
    });
  }
});
