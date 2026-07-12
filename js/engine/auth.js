class AuthEngine {

    constructor() {

        this.name = "Authentication";
        this.version = "1.0.0";
        this.status = "OFFLINE";

        // Configuración
        this.owner = CONFIG.owner;

        // Referencia al Kernel (la asignará Core.load())
        this.core = null;

    }

    init() {

        this.status = "ONLINE";

        console.log("Authentication Engine ONLINE");

        console.log("Propietario:", this.owner.name);

        console.log("Email:", this.owner.email);

        Storage.save("owner", this.owner.name);

        console.log(Storage.load("owner"));

    }

    isOwner(email) {

        return email === this.owner.email;

    }

}