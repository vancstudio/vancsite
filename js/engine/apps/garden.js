class GardenEngine {

    constructor() {

        this.name = "Garden";
        this.version = "1.0.0";
        this.status = "OFFLINE";

    }

    init() {

        this.status = "ONLINE";

        console.log("Garden Engine ONLINE");

    }

    open() {

        const panel = document.getElementById("vanc-os");

        const memory = this.core.getEngine("Memory");

        const keeper = this.core.getEngine("GardenKeeper");

        const message = keeper.think();

        const seeds = memory.recall("seeds") || [];

        let html = "";

        if (seeds.length === 0) {

            html = "<p>No hay semillas todavía.</p>";

        } else {

            seeds.forEach(seed => {

                html += `

                <div class="seed-card">

                    <h3>🌱 ${seed.title}</h3>

                    <p>${seed.text}</p>

                    <small>

                        ${new Date(seed.created).toLocaleString()}

                    </small>

                    <hr>

                </div>

                `;

            });

        }

    panel.innerHTML = `

    <div class="app">

        <div class="keeper-card">

            <pre>${message}</pre>

        </div>

        <h1>🌱 Jardín</h1>

        ${html}

        <br>

        <button id="backDesktop">

            ← Volver al Refugio

        </button>

    </div>
`;

        document
            .getElementById("backDesktop")
            .addEventListener("click", () => {

                this.core
                    .getEngine("Desktop")
                    .open();

            });

    }

}