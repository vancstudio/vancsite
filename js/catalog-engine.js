function getArtworksByCategory(category) {
    return artworks.filter(artwork =>
        artwork.category === category &&
        artwork.available === true
    );
}

function getArtworkById(id) {
    return artworks.find(artwork => artwork.id === id);
}

function renderGallery(containerId, category) {

    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = "";

    const filtered = getArtworksByCategory(category);

    filtered.forEach(artwork => {

        container.innerHTML += `

        <a href="artwork.html?id=${artwork.id}" class="print-item">

            <div class="print-image">

                <div
                    class="img img-main"
                    style="background-image:url('${artwork.thumbnail}')">
                </div>

                <div
                    class="img img-hover"
                    style="background-image:url('${artwork.hover}')">
                </div>

                <div class="shield"></div>

            </div>

            <h2>${artwork.title}</h2>

            <p class="price">
                ${artwork.price} €
            </p>

        </a>

        `;

    });

}