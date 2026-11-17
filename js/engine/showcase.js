
class ShowcaseEngine {

    constructor() {
        this.name = "Showcase";
        this.version = "1.1.0";
        this.status = "OFFLINE";
        this.showTimer = null;
    }

    init() {
        this.status = "ONLINE";

        console.log("🎬 Showcase Engine ONLINE");

        // Esperar 30 segundos desde la inicialización.
        this.showTimer = window.setTimeout(() => {
            this.show();
        }, 3000);
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
                    <img src="${item.image}" alt="${item.title}">
                </div>

                <p>${item.text}</p>

                <button id="enter-showcase">
                    ${item.button}
                </button>

            </div>
        `;

        document.body.appendChild(showcase);

        let closing = false;
        let autoCloseTimer = null;

        // Cierre gradual, tanto automático como manual.
        const closeShowcase = () => {

            if (closing) return;

            closing = true;

            if (autoCloseTimer !== null) {
                window.clearTimeout(autoCloseTimer);
            }

            showcase.classList.remove("visible");

            window.setTimeout(() => {
                showcase.remove();
            }, 700);
        };

        // Mantener el botón de cierre original.
        showcase
            .querySelector("#enter-showcase")
            .addEventListener("click", closeShowcase);

        // Asegurar que el navegador registre el estado inicial
        // antes de activar la transición de entrada.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {

                showcase.classList.add("visible");

                // Esperar a que termine la entrada.
                window.setTimeout(() => {

                    if (closing) return;

                    // Permanecer visible durante 3 segundos.
                    autoCloseTimer = window.setTimeout(
                        closeShowcase,
                        3000
                    );

                }, 700);
            });
        });
    }
}
