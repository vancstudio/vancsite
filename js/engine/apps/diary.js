class DiaryEngine {

    constructor() {

        this.name = "Diary";
        this.version = "1.1.0";
        this.status = "OFFLINE";

    }

    init() {

        this.status = "ONLINE";

    }

    open() {


    console.log("📖 Diary abierto - versión 13/07");

    const panel = document.getElementById("vanc-os");

    const auth = this.core.getEngine("Authentication");
    console.log("AUTH:", auth);

    const user = auth.currentUser();
    console.log("USER:", user);

    const username = user ? user.name : "Invitado";

    const memory = this.core.getEngine("Memory");

    const diary = memory.recall("diary") || {

        text: "",

        updated: null

    };

        let lastUpdate = "Primera entrada";

        if (diary.updated) {

            lastUpdate = new Date(diary.updated).toLocaleString();

        }

        panel.innerHTML = `

        <div class="app">

            <h1>📖 Diario</h1>

            <p><strong>Bienvenido ${username}</strong></p>

            <p>
                Última edición:
                ${lastUpdate}
            </p>

            <textarea
                id="diary"
                placeholder="Escribe tus pensamientos..."
            >${diary.text}</textarea>

            <br><br>

            <button id="saveDiary">

                💾 Guardar

            </button>

            <button id="seedDiary">

                🌱 Convertir en Semilla

            </button>

            <br><br>

            <button id="backDesktop">

                ← Volver al Refugio

            </button>

        </div>

        `;

        // Guardar Diario

        document
            .getElementById("saveDiary")
            .addEventListener("click", () => {

                memory.remember("diary", {

                    text: document.getElementById("diary").value,

                    updated: new Date().toISOString()

                });

                const button =
                    document.getElementById("saveDiary");

                button.textContent = "✅ Guardado";

                setTimeout(() => {

                    button.textContent = "💾 Guardar";

                }, 1500);

            });

        // Volver al Desktop

        document
    .getElementById("seedDiary")
    .addEventListener("click", () => {

        const seed = this.core.getEngine("Seed");

        const text = document
            .getElementById("diary")
            .value;

        if (!text.trim()) {

            alert("Escribe primero una idea.");

            return;

        }

        seed.create(text);

        alert("🌱 Semilla creada correctamente.");

    });
       

    }

}