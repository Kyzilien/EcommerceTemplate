
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
              <a href="${items.link}" class="menu-card">
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