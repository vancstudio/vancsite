function renderGallery(containerId, category) {

    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = "";

    const filtered = artworks.filter(
        artwork =>
            artwork.category === category &&
            artwork.available === true
    );

    filtered.forEach(artwork => {

        container.innerHTML += `

        <a href="${artwork.page}" class="print-item">

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