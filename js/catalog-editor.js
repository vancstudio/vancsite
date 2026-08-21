class CatalogEditorEngine {

    constructor() {

        this.name = "CatalogEditor";
        this.version = "1.0.0";
        this.status = "OFFLINE";

        this.core = null;
        this.artworks = [];

    }


    async init() {

        this.status = "ONLINE";

        console.log(
            "🛠️ Catalog Editor Engine ONLINE"
        );

    }


    async open() {

        const auth =
            this.core.getEngine(
                "Authentication"
            );

        /*
         * Seguridad de interfaz.
         *
         * Aunque el botón ya está oculto
         * para usuarios normales, volvemos
         * a comprobar la sesión aquí.
         */

        if (
            !auth ||
            !auth.isAdminSessionActive()
        ) {

            console.warn(
                "🔒 Acceso al editor denegado."
            );

            return;

        }


        console.log(
            "🛠️ Abriendo Editor de Catálogo"
        );


        await this.loadCatalog();

    }


    async loadCatalog() {

        try {

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


            this.artworks =
                await response.json();


            console.log(
                "🎨 Catálogo recibido:",
                this.artworks
            );


            this.render();

        } catch (error) {

            console.error(
                "❌ Error cargando catálogo:",
                error
            );

        }

    }


    render() {

        const panel =
            document.getElementById(
                "vanc-os"
            );


        panel.style.display =
            "flex";


        panel.innerHTML = `

            <div class="desktop">

                <div class="desktop-header">

                    <h1>
                        Editor de Catálogo
                    </h1>

                    <p>
                        VANC Studio
                    </p>

                </div>


                <div
                    id="catalog-editor"
                    style="
                        width:100%;
                        max-width:900px;
                        margin:30px auto;
                        padding:20px;
                        overflow-y:auto;
                        max-height:70vh;
                    "
                >

                    ${this.renderArtworks()}

                </div>


                <button
                    id="catalog-editor-back"
                >
                    ← Volver
                </button>


            </div>

        `;


        const back =
            document.getElementById(
                "catalog-editor-back"
            );


        if (back) {

            back.addEventListener(
                "click",
                () => {

                    const desktop =
                        this.core.getEngine(
                            "Desktop"
                        );

                    desktop.open();

                }
            );

        }


        this.attachEvents();

    }


    renderArtworks() {

        if (
            !this.artworks.length
        ) {

            return `
                <p>
                    No hay obras en el catálogo.
                </p>
            `;

        }


        return this.artworks
            .map(
                artwork =>
                    this.renderArtwork(
                        artwork
                    )
            )
            .join("");

    }


    renderArtwork(artwork) {

        return `

            <div
                class="catalog-editor-item"
                data-id="${artwork.id}"
                style="
                    border-bottom:1px solid #ccc;
                    padding:25px 0;
                    margin-bottom:20px;
                "
            >

                <h2>
                    ${artwork.title}
                </h2>


                <label>
                    Título
                </label>

                <input
                    data-field="title"
                    value="${this.escape(
                        artwork.title
                    )}"
                >


                <label>
                    Precio (€)
                </label>

                <input
                    data-field="price"
                    type="number"
                    value="${artwork.price}"
                >


                <label>
                    Técnica
                </label>

                <input
                    data-field="technique"
                    value="${this.escape(
                        artwork.technique
                    )}"
                >


                <label>
                    Colección
                </label>

                <input
                    data-field="collection"
                    value="${this.escape(
                        artwork.collection
                    )}"
                >


                <label>
                    Año
                </label>

                <input
                    data-field="year"
                    type="number"
                    value="${artwork.year}"
                >


                <label>
                    Dimensiones
                </label>

                <input
                    data-field="dimensions"
                    value="${this.escape(
                        artwork.dimensions
                    )}"
                >


                <label>
                    Edición
                </label>

                <input
                    data-field="edition"
                    value="${this.escape(
                        artwork.edition
                    )}"
                >


                <label>
                    Descripción
                </label>

                <textarea
                    data-field="description"
                >${this.escape(
                    artwork.description
                )}</textarea>


                <label>

                    <input
                        data-field="available"
                        type="checkbox"
                        ${
                            artwork.available
                            ? "checked"
                            : ""
                        }
                    >

                    Disponible

                </label>


                <button
                    class="save-artwork"
                    data-id="${artwork.id}"
                >
                    💾 Guardar cambios
                </button>


            </div>

        `;

    }


    attachEvents() {

        document
            .querySelectorAll(
                ".save-artwork"
            )
            .forEach(
                button => {

                    button.addEventListener(
                        "click",
                        async () => {

                            const id =
                                button.dataset.id;

                            await this.saveArtwork(
                                id
                            );

                        }
                    );

                }
            );

    }


    async saveArtwork(id) {

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


        const item =
            document.querySelector(
                `[data-id="${id}"]`
            );


        if (!item) {

            return;

        }


        const artwork =
            this.artworks.find(
                a =>
                    a.id === id
            );


        if (!artwork) {

            return;

        }


        /*
         * Recogemos los valores
         * del formulario.
         */

        artwork.title =
            item
                .querySelector(
                    '[data-field="title"]'
                )
                .value;


        artwork.price =
            Number(
                item
                    .querySelector(
                        '[data-field="price"]'
                    )
                    .value
            );


        artwork.technique =
            item
                .querySelector(
                    '[data-field="technique"]'
                )
                .value;


        artwork.collection =
            item
                .querySelector(
                    '[data-field="collection"]'
                )
                .value;


        artwork.year =
            Number(
                item
                    .querySelector(
                        '[data-field="year"]'
                    )
                    .value
            );


        artwork.dimensions =
            item
                .querySelector(
                    '[data-field="dimensions"]'
                )
                .value;


        artwork.edition =
            item
                .querySelector(
                    '[data-field="edition"]'
                )
                .value;


        artwork.description =
            item
                .querySelector(
                    '[data-field="description"]'
                )
                .value;


        artwork.available =
            item
                .querySelector(
                    '[data-field="available"]'
                )
                .checked;


        /*
         * Enviamos TODO el catálogo.
         */

        try {

            const response =
                await fetch(
                    "https://vanc-api.a26kiss.workers.dev/artworks",
                    {

                        method:
                            "PUT",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                "Bearer " +
                                token

                        },

                        body:
                            JSON.stringify(
                                this.artworks
                            )

                    }
                );


            const result =
                await response.json();


            if (!response.ok) {

                console.error(
                    "❌ Error actualizando:",
                    result
                );

                alert(
                    "No se pudo guardar."
                );

                return;

            }


            console.log(
                "✅ Catálogo actualizado:",
                result
            );


            alert(
                "✅ Catálogo actualizado.\n\n" +
                "Commit: " +
                (
                    result.commit ||
                    "creado"
                )
            );


        } catch (error) {

            console.error(
                "❌ Error de conexión:",
                error
            );

            alert(
                "Error de conexión con VANC API."
            );

        }

    }


    escape(value) {

        return String(
            value ?? ""
        )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

    }

}