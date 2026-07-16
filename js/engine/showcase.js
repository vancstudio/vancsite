class ShowcaseEngine {

    constructor() {

        this.name = "Showcase";
        this.version = "1.0.0";
        this.status = "OFFLINE";

    }

    init() {

        this.status = "ONLINE";

        console.log("🎬 Showcase Engine ONLINE");

        this.show();

    }

    show() {

        console.log("🎬 SHOW");

        const gallery = this.core.getEngine("Gallery");

        if (!gallery) {
            console.error("❌ Gallery Engine no encontrado");
            return;
        }

        const item = gallery.getRandomShowcase();

        if (!item) {
            console.warn("⚠️ No hay escaparates disponibles");
            return;
        }

        console.log("🎲 Escaparate:", item);

        const showcase = document.createElement("div");

        showcase.id = "showcase";

        showcase.innerHTML = `

<div class="showcase-card">

    <h2>${item.title}</h2>

    <div class="showcase-image">

        <img
            src="${item.image}"
            alt="${item.title}">

    </div>

    <p>${item.text}</p>

    <button id="enter-showcase">

        ${item.button}

    </button>

</div>

`;

        document.body.appendChild(showcase);

        document
            .getElementById("enter-showcase")
            .addEventListener("click", () => {

                if (showcase.parentNode) {
                    showcase.remove();
                }

            });

        // Cierre automático a los 5 segundos
        setTimeout(() => {

            if (showcase.parentNode) {
                showcase.remove();
            }

        }, 5000);

    }

}