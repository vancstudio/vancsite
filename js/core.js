class Core {

    constructor() {

        // Identidad del sistema
        this.system = CONFIG.system;
        this.version = CONFIG.version;
        this.studio = CONFIG.studio;

        // Estado del sistema
        this.status = "ONLINE";

        // Misión actual
        this.mission = "Conseguir la primera venta";

        // Registro de motores
        this.engines = [];

    }

   async boot() {

    for (const engine of this.engines) {

        await engine.init();

        console.log("✅ Engine iniciado:", engine.name);

    }

    console.log("================================");
    console.log("================================");
    console.log(this.system);
    console.log("Versión:", this.version);
    console.log("Studio:", this.studio);
    console.log("Estado:", this.status);
    console.log("Misión:", this.mission);
    console.log("--------------------------------");

    this.engines.forEach(engine => {

        console.log(
            `${engine.name} v${engine.version} - ${engine.status}`
        );

    });

    console.log("--------------------------------");
    console.log("Engines:", this.engines.length);
    console.log("================================");

}

load(engine) {

    engine.core = this;

    this.engines.push(engine);

    console.log("Engine registrado:", engine.name);

}

getEngine(name) {

    return this.engines.find(engine => engine.name === name);

}
returnToGallery() {

    const panel = document.getElementById("vanc-os");

    panel.style.display = "none";

    console.log("Volviendo a la galería...");

}
}

const core = new Core();

const gallery = new GalleryEngine();
core.load(new AuthEngine());
core.load(new MemoryEngine());
core.load(new SeedEngine());
core.load(new GardenKeeperEngine());
core.load(new WelcomeEngine());

core.load(gallery);              // ← Primero la galería

core.load(new ShowcaseEngine()); // ← Después el escaparate

core.load(new WebsiteEngine());
core.load(new DesktopEngine());
core.load(new GardenEngine());
core.load(new DiaryEngine());

(async () => {

    await core.boot();

})();