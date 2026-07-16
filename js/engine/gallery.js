class GalleryEngine {

    constructor() {

        this.name = "Gallery";
        this.version = "1.0.0";
        this.status = "OFFLINE";

        // Refugio
        this.showcases = [];

    }

    async init() {

        this.status = "ONLINE";

        console.log("Gallery Engine ONLINE");

        await this.loadShowcases();

        const showcase = this.getRandomShowcase();

        console.log("🎲 Escaparate elegido:", showcase);

    }

  async loadShowcases() {

    console.log("📥 Entrando en loadShowcases");

    try {

        const response = await fetch("data/showcases.json");

        console.log("📡 HTTP:", response.status);

        this.showcases = await response.json();

        console.log("📚 Refugio cargado");

        console.table(this.showcases);

    } catch (error) {

        console.error(error);

    }

}
    getRandomShowcase() {

        if (this.showcases.length === 0) {

            console.warn("⚠️ El Refugio está vacío.");

            return null;

        }

        const index = Math.floor(Math.random() * this.showcases.length);

        return this.showcases[index];

    }

}