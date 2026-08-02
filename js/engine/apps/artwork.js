class ArtworkEngine {

    constructor() {

        this.name = "Artwork";
        this.version = "1.0.0";
        this.status = "OFFLINE";

    }

    init() {

        this.status = "ONLINE";

        console.log("🎨 Artwork Engine ONLINE");

    }

    open() {

        const panel = document.getElementById("vanc-os");
        panel.scrollTop = 0;
window.scrollTo(0, 0);

       panel.innerHTML = `

<div class="app">

    <h1>🎨 Obras</h1>

    <p>Centro de gestión del catálogo VANC.</p>

    <div class="app-grid">

        <button id="newArtwork">
            ➕ Nueva obra
        </button>

        <button id="catalogArtwork">
            📚 Catálogo
        </button>

        <button id="galleryArtwork">
            🖼 Galería
        </button>

        <button id="settingsArtwork">
            ⚙ Configuración
        </button>

    </div>

    <br>

    <button id="backDesktop">
        ← Volver al Refugio
    </button>

</div>

`;
document
    .getElementById("newArtwork")
    .addEventListener("click", () => {

        console.log("Nueva obra");

    });

document
    .getElementById("catalogArtwork")
    .addEventListener("click", () => {

        console.log("Catálogo");

    });

document
    .getElementById("galleryArtwork")
    .addEventListener("click", () => {

        console.log("Galería");

    });

document
    .getElementById("settingsArtwork")
    .addEventListener("click", () => {

        console.log("Configuración");

    });

document
    .getElementById("backDesktop")
    .addEventListener("click", () => {

        this.core
            .getEngine("Desktop")
            .open();

    });
        document
            .getElementById("backDesktop")
            .addEventListener("click", () => {

                this.core
                    .getEngine("Desktop")
                    .open();

            });

    }

}