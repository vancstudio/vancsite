class GalleryEngine {

    constructor() {

        this.name = "Gallery";
        this.version = "1.0.0";
        this.status = "OFFLINE";

        // Refugio
        this.showcases = [];

        this.currentShowcase = null;

    }

    async init() {

        this.status = "ONLINE";

        console.log("Gallery Engine ONLINE");

        await this.loadShowcases();

        const showcase = this.getRandomShowcase();

        console.log("🎲 Escaparate elegido:", showcase);

console.table(this.getShowcases());

console.log(this.getShowcase("forest"));

    }

  async loadShowcases() {

    console.log("📥 Entrando en loadShowcases");

    try {

        const response = await fetch("data/showcases.json");

        console.log("📡 HTTP:", response.status);

       const local = localStorage.getItem("vanc-showcases");

if (local) {

    console.log("📂 Cargando escaparates desde localStorage");

    this.showcases = JSON.parse(local);

} else {

    this.showcases = await response.json();

    console.log("📚 Refugio cargado desde JSON");

}

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

    this.currentShowcase = this.showcases[index];

    console.log("🌿 Escaparate seleccionado:", this.currentShowcase.title);

    return this.currentShowcase;

}

setCurrentShowcase(id) {

    const showcase = this.showcases.find(s => s.id === id);

    if (!showcase) {

        console.warn("❌ Escaparate no encontrado:", id);

        return false;

    }

    this.currentShowcase = showcase;

    console.log("🌿 Escaparate activo:", showcase.title);

    return true;

}

getCurrentShowcase() {

    return this.currentShowcase;

}
getShowcases() {

    return this.showcases;

}
getShowcase(id) {

    return this.showcases.find(s => s.id === id);

}
addShowcase(showcase) {

    this.showcases.push(showcase);

    console.log("✅ Escaparate añadido:", showcase.title);

}
save() {

    localStorage.setItem(

        "vanc-showcases",

        JSON.stringify(this.showcases)

    );

    console.log("💾 Gallery guardada en localStorage");

}
}