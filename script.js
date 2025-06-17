
// ===============
// SMOOTH SCROLL
// ===============
// This listens for any <a href="#section"> click
// and scrolls smoothly to that section instead of jumping
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});


// ===============
// NAV LINK HIGHLIGHT ON SCROLL
// ===============
// This checks which section is visible and adds 'active' class to nav links
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let scrollY = window.scrollY;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      const id = section.getAttribute("id");

      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(id)) {
          link.classList.add("active");
        }
      });
    }
  });
});

// Checkout
document.addEventListener("DOMContentLoaded", () => {
  // Simple example cart, normally this would be loaded dynamically
  const mockCart = [
    { name: "Chocolate Dream", quantity: 1, price: 40 },
    { name: "Baby Vanilla", quantity: 2, price: 40 }
  ];

  const cartList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  let total = 0;

  mockCart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.quantity} x ${item.name} — $${item.price * item.quantity}`;
    cartList.appendChild(li);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = total.toFixed(2);

  document.getElementById("checkout-form").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you! Your order has been received (simulation only).");
  });
});

// Cart
document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  let total = 0;

  if (cart.length === 0) {
    cartList.innerHTML = "<li>Your cart is empty.</li>";
  } else {
    cart.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.quantity} x ${item.name} — $${item.price * item.quantity}`;
      cartList.appendChild(li);
      total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);
  }

  document.getElementById("checkout-form").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Order placed! (Mock checkout)");

    // Clear cart after placing order
    localStorage.removeItem("cart");
    window.location.href = "index.html";
  });
});

// Contact
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    feedback.textContent = "Thanks! Your message has been sent.";
    feedback.style.color = "green";

    form.reset();
  });
});
