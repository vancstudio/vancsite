class SeedEngine {

    constructor() {

        this.name = "Seed";
        this.version = "1.0.0";
        this.status = "OFFLINE";

    }

    init() {

        this.status = "ONLINE";

        console.log("Seed Engine ONLINE");

    }

    create(text) {

        const memory = this.core.getEngine("Memory");

        const seeds = memory.recall("seeds") || [];

        const seed = {

            id: Date.now(),

            title: text.substring(0,40),

            text,

            created: new Date().toISOString(),

            status: "idea"

        };

        seeds.push(seed);

        memory.remember("seeds", seeds);

        console.log("Nueva semilla", seed);

        return seed;

    }

}