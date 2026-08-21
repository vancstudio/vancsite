let artworks = [];

async function loadArtworkData() {

    try {

        const response = await fetch(
            "https://vanc-api.a26kiss.workers.dev/artworks"
        );

        if (!response.ok) {

            throw new Error(
                "API error: " + response.status
            );

        }

        artworks =
            await response.json();

        console.log(
            "🎨 Obra cargada desde VANC API:",
            artworks
        );

        loadArtwork();

    } catch (error) {

        console.error(
            "❌ No se pudo cargar la obra:",
            error
        );

    }

}