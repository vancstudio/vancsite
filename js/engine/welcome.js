class WelcomeEngine {

    constructor() {

        this.name = "Welcome";
        this.version = "0.1.0";
        this.status = "OFFLINE";

        this.lastVisit = null;

    }

    init() {

        this.status = "ONLINE";
         
        console.log("Desktop Engine ONLINE");

        this.rememberVisit();

        this.render();

    }

    render() {

        this.open();

        let message;

        if (this.lastVisit) {

            const fecha = new Date(this.lastVisit);

            message = `
                La última vez nos vimos el
                ${fecha.toLocaleString()}.
            `;

        } else {

            message = "Me alegra volver a encontrarte.";

        }

        const panel = document.getElementById("vanc-os");

        panel.innerHTML = `
            <div class="welcome-card">

                <h1>VANC OS</h1>

                <h2>Bienvenido a VANC OS</h2>

                <p>${message}</p>

                <button id="enter-vanc">
                    Entrar al Refugio
                </button>

            </div>
        `;

      document
    .getElementById("enter-vanc")
    .addEventListener("click", () => {

        console.log("CLICK OK");

        this.close();

        const desktop = this.core.getEngine("Desktop");

        console.log(desktop);

        desktop.open();

    });

    }

    rememberVisit() {

        this.lastVisit = Storage.load("lastVisit");

        Storage.save("lastVisit", new Date().toISOString());

    }

    open() {

        const panel = document.getElementById("vanc-os");

        panel.style.display = "flex";

    }

    close() {

        const panel = document.getElementById("vanc-os");

        panel.style.display = "none";

    }

}