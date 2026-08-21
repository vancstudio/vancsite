let artworks = [];

async function loadArtworks() {

    try {

        const response = await fetch(
            "https://vanc-api.a26kiss.workers.dev/artworks"
        );

        if (!response.ok) {

            throw new Error(
                "API error: " + response.status
            );

        }

        const data =
            await response.json();

        artworks = data;

        console.log(
            "🎨 Catálogo cargado desde VANC API:",
            artworks
        );

        renderFilters();
        activateFilters();
        renderGallery(
            "gallery",
            "prints",
            "catalog"
        );

    } catch (error) {

        console.error(
            "❌ No se pudo cargar el catálogo:",
            error
        );

    }

}