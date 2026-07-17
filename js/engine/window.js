class WindowEngine {

    constructor() {

        this.name = "Window";
        this.version = "2.0.0";
        this.status = "OFFLINE";

    }

    init() {

        this.status = "ONLINE";

        console.log("🪟 Window Engine ONLINE");

    }

   create(title) {

    console.log("🪟 Creando ventana...");

    const win = document.createElement("div");

    win.className = "vanc-window";

    win.innerHTML = `
        <div class="vanc-titlebar">
            <span>${title}</span>
            <button class="close-window">✕</button>
        </div>

        <div class="vanc-content"></div>
    `;

    const manager = document.getElementById("window-manager");

    manager.appendChild(win);

    win.querySelector(".close-window").onclick = () => {
        win.remove();
    };

    return win;

}

}