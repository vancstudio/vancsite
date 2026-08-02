function getArtworksByCategory(category) {

    return artworks.filter(artwork =>
        artwork.category === category &&
        artwork.available === true
    );

}

function getArtworkById(id) {

    return artworks.find(artwork =>
        artwork.id === id
    );

}

function renderFilters() {

    const nav = document.getElementById("catalog-filter");

    if (!nav) return;

    nav.innerHTML = "";

    // Botón principal
    nav.innerHTML += `
        <a href="#" class="filter-item active" data-technique="all">
            Selección
        </a>
    `;

    // Técnicas únicas
    const techniques = [...new Set(
        artworks.map(a => a.technique)
    )];

    techniques.sort();

    techniques.forEach(t => {

        nav.innerHTML += `
            <a href="#"
               class="filter-item"
               data-technique="${t}">
                ${t}
            </a>
        `;

    });

}

function activateFilters() {

    const filters = document.querySelectorAll(".filter-item");

    filters.forEach(filter => {

        filter.addEventListener("click", function(e) {

            e.preventDefault();

            document
                .querySelectorAll(".filter-item")
                .forEach(f => f.classList.remove("active"));

            filter.classList.add("active");

            console.log("Filtro:", filter.dataset.technique);

        });

    });

}

function renderGallery(containerId, category, mode = "catalog") {

    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = "";

    const filtered = getArtworksByCategory(category);

    filtered.forEach(artwork => {

        container.innerHTML += `

        <a href="artwork.html?id=${artwork.id}&mode=${mode}" class="print-item">

            <div class="print-image">

                <div class="img img-main"
                     style="background-image:url('${artwork.thumbnail}')">
                </div>

                <div class="img img-hover"
                     style="background-image:url('${artwork.hover}')">
                </div>

                <div class="shield"></div>

            </div>

            <h2>${artwork.title}</h2>

            ${mode === "catalog" ? `
                <p class="price">${artwork.price} €</p>
            ` : ``}

            ${mode === "gallery" && artwork.available ? `
                <p class="view-catalog">
                    Ver disponibilidad →
                </p>
            ` : ``}

        </a>

        `;

    });

}