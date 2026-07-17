class ShowcaseManagerEngine {

    constructor() {

        this.name = "ShowcaseManager";
        this.version = "2.1.0";
        this.status = "OFFLINE";

        this.content = null;
        this.gallery = null;
        this.windowEngine = null;

    }

    init() {

        this.status = "ONLINE";

        console.log("🛠 Showcase Manager ONLINE");

    }

    open() {

        console.log("🛠 Entrando en ShowcaseManager.open()");

        this.windowEngine = this.core.getEngine("Window");
        this.gallery = this.core.getEngine("Gallery");

        const win = this.windowEngine.create("Gestor de Escaparates");

        this.content = win.querySelector(".vanc-content");

        this.renderShowcases();

    }

    renderShowcases() {

        const showcases = this.gallery.getShowcases();

        let html = "<h2>Escaparates</h2>";

        showcases.forEach(showcase => {

            html += `
                <div class="showcase-row">

                    <h3>${showcase.title}</h3>

                    <p>${showcase.text}</p>

                    <button data-id="${showcase.id}">
                        ${showcase.button}
                    </button>

                </div>
            `;

        });

        this.content.innerHTML = html;

        this.activateButtons();

    }

    activateButtons() {

        this.content.querySelectorAll("button").forEach(button => {

            button.addEventListener("click", () => {

                const id = button.dataset.id;

                console.log("Escaparate seleccionado:", id);

                const showcase = this.gallery.getShowcase(id);

                if (!showcase) return;

                this.openEditor(showcase);

            });

        });

    }

    openEditor(showcase) {

        const detail = this.windowEngine.create("Editar escaparate");

        const detailContent = detail.querySelector(".vanc-content");

        detailContent.innerHTML = `

<label>Título</label><br>
<input id="sc-title" type="text" value="${showcase.title}"><br><br>

<label>Imagen</label><br>
<input id="sc-image" type="text" value="${showcase.image}"><br><br>

<label>Texto</label><br>
<textarea id="sc-text">${showcase.text}</textarea><br><br>

<label>Botón</label><br>
<input id="sc-button" type="text" value="${showcase.button}"><br><br>

<button id="save-showcase">
💾 Guardar
</button>

`;

        const titleInput = detailContent.querySelector("#sc-title");
        const imageInput = detailContent.querySelector("#sc-image");
        const textInput = detailContent.querySelector("#sc-text");
        const buttonInput = detailContent.querySelector("#sc-button");

        detailContent.querySelector("#save-showcase").addEventListener("click", () => {

            showcase.title = titleInput.value;
            showcase.image = imageInput.value;
            showcase.text = textInput.value;
            showcase.button = buttonInput.value;

            this.gallery.save();

            console.log("💾 Escaparate actualizado");
            console.log(showcase);

            // Redibuja automáticamente la lista
            this.renderShowcases();

            alert("Cambios guardados en memoria");

        });

    }

}