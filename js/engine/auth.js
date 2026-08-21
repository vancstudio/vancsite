class AuthEngine {

    constructor() {

        this.name = "Authentication";
        this.version = "3.0.0";
        this.status = "OFFLINE";

        // Usuarios autorizados para entrar en VANC
        this.users = CONFIG.users;

        // Usuario actual: SOLO memoria
        this.user = null;

        // Credencial Google: SOLO memoria
        this.googleCredential = null;

        // Sesión administrativa VANC: SOLO memoria
        this.adminSession = null;

        // Referencia al Core
        this.core = null;

        // API VANC
        this.apiUrl =
            "https://vanc-api.a26kiss.workers.dev";

    }


    init() {

        this.status = "ONLINE";

        console.log(
            "Authentication Engine ONLINE"
        );

        console.table(this.users);

        // IMPORTANTE:
        // No recuperamos usuario desde Storage.
        this.user = null;

        // No recuperamos sesión administrativa.
        this.adminSession = null;

        // No recuperamos credencial Google.
        this.googleCredential = null;

    }


    async startGoogleIdentity() {

        console.log(
            "Inicializando Google Identity..."
        );


        // Si ya existe una sesión en memoria
        if (this.isLogged()) {

            console.log(
                "Usuario ya autenticado en esta sesión."
            );

            const desktop =
                this.core.getEngine(
                    "Desktop"
                );

            desktop.open();

            return;

        }


        if (
            typeof google ===
            "undefined"
        ) {

            console.error(
                "Google Identity no está cargado."
            );

            return;

        }


        google.accounts.id.initialize({

            client_id:
                CONFIG.google.clientId,

            callback:
                async (response) => {

                    console.log(
                        "Respuesta de Google:",
                        response
                    );


                    // Guardamos la credencial
                    // únicamente en memoria
                    this.googleCredential =
                        response.credential;


                    const payload =
                        this.decodeJwt(
                            response.credential
                        );


                    console.log(
                        "Usuario Google:",
                        payload
                    );


                    const email =
                        payload.email;


                    /*
                     * Primero comprobamos
                     * que el usuario pertenece
                     * a CONFIG.users.
                     */

                    if (
                        !this.login(email)
                    ) {

                        console.log(
                            "Usuario no autorizado"
                        );

                        this.googleCredential =
                            null;

                        this.adminSession =
                            null;

                        return;

                    }


                    console.log(
                        "Acceso autorizado"
                    );


                    /*
                     * Si el usuario es Vani,
                     * solicitamos una sesión
                     * administrativa al Worker.
                     */

                    const session =
                        await this.createAdminSession(
                            response.credential
                        );


                    if (session) {

                        console.log(
                            "🔐 Sesión administrativa VANC creada"
                        );

                    } else {

                        console.log(
                            "ℹ️ Este usuario no tiene sesión administrativa."
                        );

                    }


                    /*
                     * Abrimos el Refugio
                     */

                    const desktop =
                        this.core.getEngine(
                            "Desktop"
                        );

                    desktop.open();

                }

        });


        /*
         * Mostramos selector de Google
         */

        google.accounts.id.prompt();


        console.log(
            "Mostrando selector de Google..."
        );

        console.log(
            "Google Identity listo."
        );

    }


    /*
     * Login local de VANC
     */

    login(email) {

        const normalizedEmail =
            (email || "")
                .trim()
                .toLowerCase();


        this.user =
            this.users.find(
                user =>
                    (user.email || "")
                        .trim()
                        .toLowerCase() ===
                    normalizedEmail
            );


        if (this.user) {

            console.log(
                "Bienvenido",
                this.user.name
            );

            /*
             * NO usamos Storage.
             *
             * El usuario vive únicamente
             * durante esta sesión.
             */

            return true;

        }


        console.log(
            "Usuario no autorizado"
        );


        return false;

    }


    /*
     * Solicita al Worker una sesión
     * administrativa temporal.
     */

    async createAdminSession(
        credential
    ) {

        try {

            console.log(
                "Solicitando sesión administrativa VANC..."
            );


            const result =
                await fetch(
                    this.apiUrl +
                    "/admin/session",
                    {

                        method:
                            "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify({

                                credential:
                                    credential

                            })

                    }
                );


            const data =
                await result.json();


            if (!result.ok) {

                console.warn(
                    "VANC Admin:",
                    data
                );

                this.adminSession =
                    null;

                return null;

            }


            if (
                !data.success ||
                !data.sessionToken
            ) {

                console.warn(
                    "El Worker no devolvió una sesión válida."
                );

                this.adminSession =
                    null;

                return null;

            }


            /*
             * Guardamos la sesión solamente
             * en memoria.
             */

            this.adminSession = {

                token:
                    data.sessionToken,

                role:
                    data.role,

                expiresAt:
                    Date.now() +
                    (
                        data.expiresIn *
                        1000
                    )

            };


            console.log(
                "Sesión VANC válida hasta:",
                new Date(
                    this.adminSession.expiresAt
                ).toLocaleString()
            );


            return this.adminSession;

        } catch (error) {

            console.error(
                "Error creando sesión VANC:",
                error
            );

            this.adminSession =
                null;

            return null;

        }

    }


    /*
     * Devuelve el token administrativo
     * si todavía está vigente.
     */

    getAdminSession() {

        if (
            !this.adminSession
        ) {

            return null;

        }


        if (
            Date.now() >=
            this.adminSession.expiresAt
        ) {

            console.log(
                "⏱️ Sesión administrativa VANC caducada."
            );

            this.adminSession =
                null;

            return null;

        }


        return this.adminSession;

    }


    /*
     * Devuelve solamente el token.
     */

    getAdminToken() {

        const session =
            this.getAdminSession();


        if (!session) {

            return null;

        }


        return session.token;

    }


    /*
     * Cierre completo de sesión
     */

    logout() {

        this.user = null;

        this.googleCredential = null;

        this.adminSession = null;


        /*
         * Evita que Google reutilice
         * automáticamente la cuenta anterior.
         */

        if (
            typeof google !==
            "undefined" &&
            google.accounts &&
            google.accounts.id
        ) {

            google.accounts.id.disableAutoSelect();

        }


        console.log(
            "🔒 Sesión VANC cerrada."
        );

    }


    currentUser() {

        return this.user;

    }


    isLogged() {

        return this.user !== null;

    }


    isAdminSessionActive() {

        return (
            this.getAdminSession() !==
            null
        );

    }


    /*
     * Decodificación local del JWT
     *
     * IMPORTANTE:
     * esto NO se utiliza para confiar
     * en la identidad frente al servidor.
     *
     * El Worker verifica realmente
     * la firma de Google.
     */

    decodeJwt(token) {

        try {

            const base64Url =
                token.split(".")[1];


            const base64 =
                base64Url
                    .replace(
                        /-/g,
                        "+"
                    )
                    .replace(
                        /_/g,
                        "/"
                    );


            return JSON.parse(
                atob(base64)
            );

        } catch (error) {

            console.error(
                "No se pudo decodificar JWT:",
                error
            );

            return null;

        }

    }

}