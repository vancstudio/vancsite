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

                <p>
                    Centro de gestión del catálogo VANC.
                </p>

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

                this.openCatalog();

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

    }


    openCatalog() {

        const panel = document.getElementById("vanc-os");

        panel.scrollTop = 0;
        window.scrollTo(0, 0);


        /*
         * Primero buscamos un catálogo guardado.
         *
         * Si todavía no existe,
         * utilizamos data/artworks.js
         */

        const storedArtworks =
            Storage.load("artworks");

        const catalogArtworks =
            storedArtworks || artworks;


        const artworksList = catalogArtworks
            .filter(artwork => artwork.available === true)
            .map(artwork => `

                <div class="artwork-card">

                    <h2>
                        ${artwork.title}
                    </h2>

                    <p>
                        ${artwork.technique}
                    </p>

                    <p>
                        ${artwork.price} €
                    </p>

                    <p>
                        ${artwork.available
                            ? "Disponible"
                            : "No disponible"}
                    </p>

                    <button
                        data-id="${artwork.id}"
                        class="editArtwork">

                        ✏️ Editar

                    </button>

                </div>

            `)
            .join("");


        panel.innerHTML = `

            <div class="app">

                <h1>📚 Catálogo</h1>

                ${artworksList}

                <br>

                <button id="backArtwork">
                    ← Volver a Obras
                </button>

            </div>

        `;


        document
            .querySelectorAll(".editArtwork")
            .forEach(button => {

                button.addEventListener("click", () => {

                    const id =
                        button.dataset.id;

                    const artwork =
                        catalogArtworks.find(
                            artwork =>
                                artwork.id === id
                        );

                    if (!artwork) return;

                    this.openEditor(
                        artwork,
                        catalogArtworks
                    );

                });

            });


        document
            .getElementById("backArtwork")
            .addEventListener("click", () => {

                this.open();

            });

    }


    openEditor(
        artwork,
        catalogArtworks
    ) {

        const panel =
            document.getElementById("vanc-os");

        panel.scrollTop = 0;
        window.scrollTo(0, 0);


        panel.innerHTML = `

            <div class="app">

                <h1>✏️ Editar obra</h1>

                <div class="artwork-editor">

                    <label>
                        Título

                        <input
                            id="edit-title"
                            type="text"
                            value="${artwork.title}">
                    </label>


                    <label>
                        Descripción

                        <textarea
                            id="edit-description">${artwork.description}</textarea>
                    </label>


                    <label>
                        Técnica

                        <input
                            id="edit-technique"
                            type="text"
                            value="${artwork.technique}">
                    </label>


                    <label>
                        Colección

                        <input
                            id="edit-collection"
                            type="text"
                            value="${artwork.collection}">
                    </label>


                    <label>
                        Año

                        <input
                            id="edit-year"
                            type="number"
                            value="${artwork.year}">
                    </label>


                    <label>
                        Dimensiones

                        <input
                            id="edit-dimensions"
                            type="text"
                            value="${artwork.dimensions}">
                    </label>


                    <label>
                        Edición

                        <input
                            id="edit-edition"
                            type="text"
                            value="${artwork.edition}">
                    </label>


                    <label>
                        Precio (€)

                        <input
                            id="edit-price"
                            type="number"
                            value="${artwork.price}">
                    </label>


                    <label>

                        Disponible

                        <input
                            id="edit-available"
                            type="checkbox"
                            ${artwork.available
                                ? "checked"
                                : ""}>

                    </label>

                </div>


                <br>


                <button id="saveArtwork">

                    💾 Guardar cambios

                </button>


                <button id="backCatalog">

                    ← Volver al Catálogo

                </button>

            </div>

        `;


        /*
         * GUARDAR
         */

        document
            .getElementById("saveArtwork")
            .addEventListener("click", () => {


                artwork.title =
                    document
                        .getElementById(
                            "edit-title"
                        )
                        .value;


                artwork.description =
                    document
                        .getElementById(
                            "edit-description"
                        )
                        .value;


                artwork.technique =
                    document
                        .getElementById(
                            "edit-technique"
                        )
                        .value;


                artwork.collection =
                    document
                        .getElementById(
                            "edit-collection"
                        )
                        .value;


                artwork.year =
                    Number(
                        document
                            .getElementById(
                                "edit-year"
                            )
                            .value
                    );


                artwork.dimensions =
                    document
                        .getElementById(
                            "edit-dimensions"
                        )
                        .value;


                artwork.edition =
                    document
                        .getElementById(
                            "edit-edition"
                        )
                        .value;


                artwork.price =
                    Number(
                        document
                            .getElementById(
                                "edit-price"
                            )
                            .value
                    );


                artwork.available =
                    document
                        .getElementById(
                            "edit-available"
                        )
                        .checked;


                /*
                 * Guardamos TODO el catálogo
                 * en localStorage.
                 */

                Storage.save(
                    "artworks",
                    catalogArtworks
                );


                console.log(
                    "🎨 Catálogo guardado:",
                    catalogArtworks
                );


                alert(
                    "Cambios guardados correctamente."
                );


                this.openCatalog();

            });


        /*
         * VOLVER
         */

        document
            .getElementById("backCatalog")
            .addEventListener("click", () => {

                this.openCatalog();

            });

    }

}