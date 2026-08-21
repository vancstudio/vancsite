class DesktopEngine {

    constructor() {

        this.name = "Desktop";
        this.version = "1.1.0";
        this.status = "OFFLINE";

    }


    init() {

        this.status = "ONLINE";

    }


    open() {

        const panel =
            document.getElementById("vanc-os");

        const auth =
            this.core.getEngine(
                "Authentication"
            );

        const user =
            auth.currentUser();

        /*
         * Comprobamos si existe
         * una sesión administrativa VANC.
         */

        const adminActive =
            auth.isAdminSessionActive();


        panel.style.display = "flex";


        panel.innerHTML = `

            <div id="window-manager"></div>

            <div class="desktop">

                <div class="desktop-header">

                    <h1>VANC OS</h1>

                    <p>
                        ${user
                            ? user.name
                            : "Invitado"}
                    </p>

                </div>


                <div class="desktop-icons">


                    <button id="app-diary">

                        <span class="icon">
                            📝
                        </span>

                        <span class="label">
                            Diario
                        </span>

                    </button>


                    <button id="app-garden">

                        <span class="icon">
                            🌱
                        </span>

                        <span class="label">
                            Jardín
                        </span>

                    </button>


                    <button id="app-gallery">

                        <span class="icon">
                            🖼️
                        </span>

                        <span class="label">
                            Escaparate
                        </span>

                    </button>


                    <button id="app-ai">

                        <span class="icon">
                            🤖
                        </span>

                        <span class="label">
                            IA
                        </span>

                    </button>


                    <button id="app-artwork">

                        <span class="icon">
                            🎨
                        </span>

                        <span class="label">
                            Obras
                        </span>

                    </button>


                    ${
                        adminActive
                        ? `

                        <button id="app-catalog">

                            <span class="icon">
                                🛠️
                            </span>

                            <span class="label">
                                Catálogo
                            </span>

                        </button>

                        `
                        : ""
                    }


                    <button id="app-settings">

                        <span class="icon">
                            ⚙️
                        </span>

                        <span class="label">
                            Sistema
                        </span>

                    </button>


                </div>


                <hr>


                <button id="back-gallery">

                    ← Volver a la Galería

                </button>


            </div>

        `;


        this.events();

    }


    close() {

        const panel =
            document.getElementById(
                "vanc-os"
            );

        panel.style.display =
            "none";

    }


    events() {


        document
            .getElementById(
                "app-diary"
            )
            .addEventListener(
                "click",
                () => {

                    const diary =
                        this.core.getEngine(
                            "Diary"
                        );

                    if (diary) {

                        diary.open();

                    }

                }
            );


        document
            .getElementById(
                "app-garden"
            )
            .addEventListener(
                "click",
                () => {

                    const garden =
                        this.core.getEngine(
                            "Garden"
                        );

                    if (garden) {

                        garden.open();

                    }

                }
            );


        document
            .getElementById(
                "app-gallery"
            )
            .addEventListener(
                "click",
                () => {

                    console.log(
                        "🖼️ Botón Escaparate pulsado"
                    );

                    const manager =
                        this.core.getEngine(
                            "ShowcaseManager"
                        );

                    console.log(
                        "Manager:",
                        manager
                    );

                    manager.open();

                }
            );


        document
            .getElementById(
                "app-ai"
            )
            .addEventListener(
                "click",
                () => {

                    console.log(
                        "Abrir IA"
                    );

                }
            );


        document
            .getElementById(
                "app-artwork"
            )
            .addEventListener(
                "click",
                () => {

                    const artwork =
                        this.core.getEngine(
                            "Artwork"
                        );

                    if (artwork) {

                        artwork.open();

                    }

                }
            );


        /*
         * CATÁLOGO
         *
         * Solo existe si Vani
         * tiene sesión administrativa.
         */

        const catalogButton =
            document.getElementById(
                "app-catalog"
            );


        if (catalogButton) {

            catalogButton.addEventListener(
                "click",
                () => {

                    console.log(
                        "🛠️ Editor de catálogo solicitado"
                    );

                    const editor =
                        this.core.getEngine(
                            "CatalogEditor"
                        );

                    if (editor) {

                        editor.open();

                    } else {

                        console.error(
                            "CatalogEditor no está registrado en Core."
                        );

                    }

                }
            );

        }


        document
            .getElementById(
                "app-settings"
            )
            .addEventListener(
                "click",
                () => {

                    console.log(
                        "Abrir Sistema"
                    );

                }
            );


        document
            .getElementById(
                "back-gallery"
            )
            .addEventListener(
                "click",
                () => {

                    this.core.returnToGallery();

                }
            );

    }

}