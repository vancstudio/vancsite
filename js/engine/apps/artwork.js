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

                this.newArtwork();

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

    async openCatalog() {

        const panel =
            document.getElementById("vanc-os");


        panel.scrollTop = 0;
        window.scrollTo(0, 0);


        if (
            (!artworks || artworks.length === 0) &&
            typeof loadArtworks === "function"
        ) {

            await loadArtworks();

        }


        const catalogArtworks =
            artworks;


        const artworksList =
            catalogArtworks
                .map(artwork => `
<div class="artwork-card">

    ${
        artwork.images?.main
            ? `
                <img
    src="${artwork.images.main}"
    data-main="${artwork.images.main}"
    data-hover="${artwork.images?.hover || ""}"
    alt="${artwork.title}"
    class="artwork-card-image"
>
            `
            : `
                <div class="artwork-card-image artwork-card-empty">
                    Sin imagen
                </div>
            `
    }

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
                            ${artwork.status === "available"
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

                <div class="artworks-grid">

                    <div class="artworks-grid">

                    ${artworksList}

                </div>

                <br>

</div>

                <br>

                <button id="backArtwork">
                    ← Volver a Obras
                </button>

            </div>

        `;


        document
            .querySelectorAll(".editArtwork")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

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

                    }
                );

            });

        document
            .querySelectorAll(".artwork-card-image")
            .forEach(image => {

                const main =
                    image.dataset.main;

                const hover =
                    image.dataset.hover;


                if (!hover) return;


                image.addEventListener(
                    "mouseenter",
                    () => {

                        image.src = hover;

                    }
                );


                image.addEventListener(
                    "mouseleave",
                    () => {

                        image.src = main;

                    }
                );

            });


        document
            .getElementById("backArtwork")
            .addEventListener(
                "click",
                () => {

                    this.open();

                }
            );

    }


    async loadCatalogFromAPI() {

        const response =
            await fetch(
                "https://vanc-api.a26kiss.workers.dev/artworks"
            );


        if (!response.ok) {

            throw new Error(
                "API error: " +
                response.status
            );

        }


        const data =
            await response.json();


        return Array.isArray(data)
            ? data
            : data.value || [];

    }





        async newArtwork() {

    let catalogArtworks;

    try {

        catalogArtworks =
            await this.loadCatalogFromAPI();

    } catch (error) {

        console.error(
            "Error cargando catálogo:",
            error
        );

        alert(
            "No se pudo cargar el catálogo actual."
        );

        return;

    }

        const artwork = {

            id:
                "VANC-" +
                Date.now(),

            title: "",

            description: "",

            technique: "",

            collection: "",

            year:
                new Date()
                    .getFullYear(),

            dimensions: "",

            edition: "",

            price: 0,

            status: "available",

            images: {

                main: "",

                hover: ""

            },

            paypal: {

                enabled: false,

                hostedButtonId: ""

            }

        };


        this.openEditor(
            artwork,
            catalogArtworks,
            true
        );

    }


    openEditor(
        artwork,
        catalogArtworks,
        isNew = false
    ) {

        const panel =
            document.getElementById("vanc-os");

        panel.scrollTop = 0;
        window.scrollTo(0, 0);


        panel.innerHTML = `

            <div class="app">

                <h1>
    ${isNew
        ? "➕ Nueva obra"
        : "✏️ Editar obra"}
</h1>

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
                        Estado

                        <select id="edit-status">

                            <option
                                value="available"
                                ${artwork.status === "available"
                                    ? "selected"
                                    : ""}>
                                Disponible
                            </option>

                            <option
                                value="reserved"
                                ${artwork.status === "reserved"
                                    ? "selected"
                                    : ""}>
                                Reservada
                            </option>

                            <option
                                value="sold"
                                ${artwork.status === "sold"
                                    ? "selected"
                                    : ""}>
                                Vendida
                            </option>

                            <option
                                value="archived"
                                ${artwork.status === "archived"
                                    ? "selected"
                                    : ""}>
                                Archivada
                            </option>

                        </select>

                    </label>


                    <label>
                        Imagen principal

                        <input
                            id="edit-image-main"
                            type="text"
                            value="${artwork.images?.main || ""}">
                    </label>


                    <label>
                        Imagen hover

                        <input
                            id="edit-image-hover"
                            type="text"
                            value="${artwork.images?.hover || ""}">
                    </label>


                    <label>
                        PayPal habilitado

                        <input
                            id="edit-paypal-enabled"
                            type="checkbox"
                            ${
                                artwork.paypal?.enabled
                                    ? "checked"
                                    : ""
                            }>
                    </label>


                    <label>
                        PayPal Hosted Button ID

                        <input
                            id="edit-paypal-button-id"
                            type="text"
                            value="${artwork.paypal?.hostedButtonId || ""}">
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
            .addEventListener("click", async () => {


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


                artwork.status =
                    document
                        .getElementById(
                            "edit-status"
                        )
                        .value;


                if (!artwork.images) {

                    artwork.images = {};

                }


                artwork.images.main =
                    document
                        .getElementById(
                            "edit-image-main"
                        )
                        .value;


                artwork.images.hover =
                    document
                        .getElementById(
                            "edit-image-hover"
                        )
                        .value;


                if (!artwork.paypal) {

                    artwork.paypal = {};

                }


                artwork.paypal.enabled =
                    document
                        .getElementById(
                            "edit-paypal-enabled"
                        )
                        .checked;


                artwork.paypal.hostedButtonId =
                    document
                        .getElementById(
                            "edit-paypal-button-id"
                        )
                        .value;
                                if (isNew) {

                    catalogArtworks.push(
                        artwork
                    );

                }

                const auth =
                    this.core.getEngine(
                        "Authentication"
                    );


                const token =
                    auth.getAdminToken();


                if (!token) {

                    alert(
                        "La sesión administrativa ha caducado."
                    );

                    return;

                }


                try {

                    const response =
                        await fetch(
                            "https://vanc-api.a26kiss.workers.dev/artworks",
                            {

                                method: "PUT",

                                headers: {

                                    "Content-Type":
                                        "application/json",

                                    "Authorization":
                                        "Bearer " + token

                                },

                                body:
                                    JSON.stringify(
                                        catalogArtworks
                                    )

                            }
                        );


                    const result =
                        await response.json();


                    if (!response.ok) {

                        console.error(
                            "Error API:",
                            result
                        );

                        alert(
                            "No se pudieron guardar los cambios."
                        );

                        return;

                    }


                    console.log(
                        "🎨 Catálogo guardado en VANC API:",
                        result
                    );


                    alert(
                        "Cambios guardados correctamente."
                    );


                } catch (error) {

                    console.error(
                        "Error de conexión:",
                        error
                    );

                    alert(
                        "Error de conexión con VANC API."
                    );

                    return;

                }


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