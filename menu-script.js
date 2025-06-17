
// ===============
// INJECT HTML
// ===============
// This allows values in the HTML to be updated based on different data
document.addEventListener("DOMContentLoaded", () => {

  fetch("data/categories.json")
    .then(response => response.json())
    .then(items => {
      const itemList = document.getElementById("categoryList");
      itemList.innerHTML = "";


      items.forEach(items => {
        const itemHTML = `
          <section class="menu-section" id="${items.id}">
            <h2>${items.name}</h2>
            <div class="menu-grid">
              <a href="${items.link}" 
              class="menu-card" 
              data-name="${items.name}" 
              data-desc= "${items.desc}"
              data-example= "${items.example}">
                <img src="images/${items.id}.jpg" alt="${items.name} Category">
                <div class="card-text">
                  <h3>${items.example}</h3>
                  <p>${items.desc}</p>
                </div>
              </a>
            </div>
          </section>
        `;
        itemList.innerHTML += itemHTML;
      });


    });
});


document.getElementById("searchInput").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const cards = document.querySelectorAll(".menu-card");

  cards.forEach(card => {
    const name = card.dataset.name.toLowerCase();
    const desc = card.dataset.desc.toLowerCase();
    const example = card.dataset.example.toLowerCase();

    const matches = name.includes(query) || desc.includes(query) || example.includes(query);
    card.style.display = matches ? "block" : "none";
  });
});