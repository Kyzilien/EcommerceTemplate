
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

      items.forEach((item, index) => {
        const bgClass = index % 2 === 0 ? "bg-light" : "bg-alt";
        const itemHTML = `
          <section class="menu-section ${bgClass}" 
                   id="${item.id}"
                   data-name="${item.name}" 
                   data-desc="${item.desc}" 
                   data-example="${item.example}">
            <h2>${item.name}</h2>
            <div class="menu-grid">
              <a href="${item.link}" class="menu-card">
                <img src="images/${item.id}.jpg" alt="${item.name} Category">
                <div class="card-text">
                  <h3>${item.example}</h3>
                  <p>${item.desc}</p>
                </div>
              </a>
            </div>
          </section>
        `;
        itemList.innerHTML += itemHTML;
      });

      items.forEach((item, index) => {
        const bgClass = index % 2 === 0 ? "bg-light" : "bg-alt";
        const itemHTML = `
          <section class="menu-section ${bgClass}" id="${item.id}">
            ...
          </section>
        `;
        itemList.innerHTML += itemHTML;
      });

    });
});


document.getElementById("searchInput").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const cards = document.querySelectorAll(".menu-section");
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
