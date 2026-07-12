class AuthEngine {

   constructor() {

    this.name = "Authentication";
    this.version = "2.0.0";
    this.status = "OFFLINE";

    // Lista de usuarios autorizados
    this.users = CONFIG.users;

    // Usuario conectado
    this.user = null;

    // Referencia al Core
    this.core = null;

}

    init() {

    this.status = "ONLINE";

    console.log("Authentication Engine ONLINE");

    console.table(this.users);

    this.startGoogleIdentity();

}

startGoogleIdentity() {

    console.log("Inicializando Google Identity...");

    if (typeof google === "undefined") {

        console.error("Google Identity no está cargado.");

        return;

    }

    google.accounts.id.initialize({

        client_id: CONFIG.google.clientId,

       callback: (response) => {

    console.log("Respuesta de Google:", response);

    const payload = this.decodeJwt(response.credential);

    console.log("Usuario Google:", payload);

    const email = payload.email;

    if (this.login(email)) {

    console.log("Acceso autorizado");

    const welcome = this.core.getEngine("Welcome");

    welcome.render();

} else {

    console.log("Usuario no autorizado");

    // No hacer absolutamente nada.
    // El visitante continúa en la web pública.

}

}
    });
google.accounts.id.prompt();

console.log("Mostrando selector de Google...");
    console.log("Google Identity listo.");

}

    login(email) {

        this.user = this.users.find(user => user.email === email);

        if (this.user) {

            console.log("Bienvenido", this.user.name);

            Storage.save("user", this.user);

            return true;

        }

        console.log("Usuario no autorizado");

        return false;

    }

    logout() {

        this.user = null;

        Storage.remove("user");

    }

    currentUser() {

        return this.user;

    }

    isLogged() {

        return this.user !== null;

    }
decodeJwt(token) {

    const base64Url = token.split(".")[1];

    const base64 = base64Url
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    return JSON.parse(atob(base64));

}
}