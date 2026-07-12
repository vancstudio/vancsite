class WebsiteEngine {

    constructor() {

        this.name = "Website";
        this.version = "1.0.0";
        this.status = "OFFLINE";

    }

    init() {

    this.status = "ONLINE";

    console.log("Website Engine ONLINE");

    this.events();

}

events() {

    const logo = document.getElementById("vanc-logo");

    if (!logo) return;

    logo.addEventListener("dblclick", () => {

        console.log("Acceso al Refugio solicitado...");

        const auth = this.core.getEngine("Authentication");

        auth.startGoogleIdentity();

    });

}
}