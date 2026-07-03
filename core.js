class Core {

    constructor() {

        // Identidad del sistema
        this.system = "VANC OS";
        this.version = "0.2.0";
        this.studio = "VANC Studio";

        // Estado del sistema
        this.status = "ONLINE";

        // Misión actual
        this.mission = "Conseguir la primera venta";

        this.boot();

    }

    boot() {

        console.log("================================");
        console.log(this.system);
        console.log("Versión:", this.version);
        console.log("Studio:", this.studio);
        console.log("Estado:", this.status);
        console.log("Misión:", this.mission);
        console.log("================================");

    }

}


const core = new Core();
