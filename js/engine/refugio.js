class RefugioEngine {

    constructor() {

        this.name = "Refugio";
        this.version = "1.0.0";
        this.status = "OFFLINE";

    }

    init() {

        this.status = "ONLINE";

        console.log("🌿 Refugio Engine ONLINE");

    }

    open() {

        console.log("🌿 Abriendo Refugio");

    }

}