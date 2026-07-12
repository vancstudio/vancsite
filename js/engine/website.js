class WebsiteEngine {

    constructor() {

        this.name = "Website";
        this.version = "1.0.0";
        this.status = "OFFLINE";

    }

    init() {

        this.status = "ONLINE";

        console.log("Website Engine ONLINE");

    }

}