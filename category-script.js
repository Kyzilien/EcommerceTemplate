document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("cid"); // Get the value after ?cid=

  if (!category) {
    document.getElementById("itemList").innerHTML = "<p>Category not specified.</p>";
    return;
  }

  fetch(`data/${category}.json`)
    .then(response => response.json())
    .then(items => {
      const itemList = document.getElementById("itemList");
      itemList.innerHTML = `<h1 class="section-title">${capitalize(category)} Menu</h1>`; // Add title dynamically

      items.forEach(item => {
        const itemHTML = `
          <section class="item-detail"
              data-name="${item.name}" 
              data-desc= "${items.description}"
              data-example= "${items.ingredients}">
            <div class="item-image">
              <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-info">
              <h2>
              <a href="${item.link}">
              ${item.name}
              </a>
              </h2>
              <p class="description">${item.description}</p>
              <p><strong>Ingredients:</strong> ${item.ingredients}</p>
              <p><strong>Price:</strong> $${item.price}</p>
            </div>
          </section>
        `;
        itemList.innerHTML += itemHTML;
      });
    })
    .catch(() => {
      document.getElementById("itemList").innerHTML = "<p>Error loading category data.</p>";
    });

  // Optional: Capitalize category name for section title
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
});

document.getElementById("searchInput").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const cards = document.querySelectorAll(".item-detail");
  let anyVisible = false;

  cards.forEach(card => {
    const name = card.dataset.name.toLowerCase();
    const desc = card.dataset.desc.toLowerCase();
    const example = card.dataset.example.toLowerCase();

    const matches = name.includes(query) || desc.includes(query) || example.includes(query);
    card.style.display = matches ? "block" : "none";
    if (matches) anyVisible = true;
  });

  document.getElementById("noResults").style.display = anyVisible ? "none" : "block";
});
