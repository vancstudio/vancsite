class DesktopEngine {

    constructor() {

        this.name = "Desktop";
        this.version = "1.0.0";
        this.status = "OFFLINE";

    }

    init() {

        this.status = "ONLINE";

    }

  open() {

    const panel = document.getElementById("vanc-os");

    const auth = this.core.getEngine("Authentication");

    const user = auth.currentUser();

    panel.style.display = "flex";

    panel.innerHTML = `

    <div class="desktop">

        <div class="desktop-header">

            <h1>VANC OS</h1>

            <p>${user ? user.name : "Invitado"}</p>

        </div>

        <div class="desktop-icons">

            <button id="app-diary">📝<br>Diario</button>

            <button id="app-gallery">🖼<br>Galería</button>

            <button id="app-ai">🤖<br>IA</button>

            <button id="app-shop">🛒<br>Shop</button>

            <button id="app-settings">⚙<br>Sistema</button>

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

    const panel = document.getElementById("vanc-os");

    panel.style.display = "none";

}
     events() {

    document
        .getElementById("app-diary")
        .addEventListener("click", () => {

            const diary = this.core.getEngine("Diary");

            if (diary) {

                diary.open();

            }

        });

    document
        .getElementById("app-gallery")
        .addEventListener("click", () => {

            console.log("Abrir Gallery");

        });

    document
        .getElementById("app-ai")
        .addEventListener("click", () => {

            console.log("Abrir IA");

        });

    document
        .getElementById("app-shop")
        .addEventListener("click", () => {

            console.log("Abrir Shop");

        });

    document
        .getElementById("app-settings")
        .addEventListener("click", () => {

            console.log("Abrir Sistema");

        });
    document
    .getElementById("back-gallery")
    .addEventListener("click", () => {

        this.core.returnToGallery();

    });
}

}