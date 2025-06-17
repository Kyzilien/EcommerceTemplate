document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  const types = {
    caid: "cakes",
    coid: "cookies",
    pid: "pops",
    oid: "other"
  };

  let matchedType = null;
  let matchedId = null;

  // Find the ID and category from the URL (e.g. ?caid=chocolate-dream)
  for (const [key, value] of params.entries()) {
    if (types[key]) {
      matchedType = types[key]; // "cakes"
      matchedId = value;        // "chocolate-dream"
      break;
    }
  }

  if (!matchedType || !matchedId) {
    document.querySelector(".item-info").innerHTML = "<p>Item not found.</p>";
    return;
  }

  // Fetch the JSON for the matching category
  fetch(`data/${matchedType}.json`)
    .then(res => res.json())
    .then(items => {
      const selectedItem = items.find(item => item.id === matchedId);
      if (selectedItem) {
        document.querySelector(".item-image img").src = selectedItem.image;
        document.querySelector(".item-image img").alt = selectedItem.name;
        document.querySelector(".item-info h2").textContent = selectedItem.name;
        document.querySelector(".description").textContent = selectedItem.description;
        document.querySelector(".ingredients").textContent = selectedItem.ingredients;
        document.querySelector(".price").textContent = `$${selectedItem.price}`;
      } else {
        document.querySelector(".item-info").innerHTML = "<p>Item not found.</p>";
      }
    })
    .catch(() => {
      document.querySelector(".item-info").innerHTML = "<p>Error loading item data.</p>";
    });
});


const addToCartBtn = document.getElementById("add-to-cart");

addToCartBtn.addEventListener("click", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const item = {
    id: selectedItem.id,
    name: selectedItem.name,
    price: selectedItem.price,
    quantity: 1
  };

  // Check if item already in cart
  const existing = cart.find(c => c.id === item.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push(item);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${selectedItem.name} added to cart!`);
});
