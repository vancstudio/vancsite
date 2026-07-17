class ShowcaseManagerEngine {

    constructor() {

        this.name = "ShowcaseManager";
        this.version = "2.0.0";
        this.status = "OFFLINE";

    }

    init() {

        this.status = "ONLINE";

        console.log("🛠 Showcase Manager ONLINE");

    }

    open() {

        console.log("🛠 Entrando en ShowcaseManager.open()");

    console.log("1");

    const windowEngine = this.core.getEngine("Window");
    console.log("2", windowEngine);

    const gallery = this.core.getEngine("Gallery");
    console.log("3", gallery);

    const win = windowEngine.create("Gestor de Escaparates");
    console.log("4", win);

    const content = win.querySelector(".vanc-content");
    console.log("5", content);

    const showcases = gallery.getShowcases();
    console.log("6", showcases);

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

content.innerHTML = html;

content.querySelectorAll("button").forEach(button => {

    button.addEventListener("click", () => {

        const id = button.dataset.id;

        console.log("Escaparate seleccionado:", id);

        const showcase = gallery.getShowcase(id);

        if (!showcase) return;

        const detail = windowEngine.create(showcase.title);

const detailContent = detail.querySelector(".vanc-content");

detailContent.innerHTML = `
    <div class="showcase-card">

        <div class="showcase-image">
            <img src="${showcase.image}" alt="${showcase.title}">
        </div>

        <p>${showcase.text}</p>

    </div>
`;

    });

});

console.log("7");

    }
}