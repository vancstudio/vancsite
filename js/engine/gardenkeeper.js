class GardenKeeperEngine {

    constructor() {

        this.name = "GardenKeeper";
        this.version = "1.0.0";
        this.status = "OFFLINE";

    }

    init() {

        this.status = "ONLINE";

        console.log("🌿 GardenKeeper ONLINE");

    }

    think() {

        const memory = this.core.getEngine("Memory");

        const seeds = memory.recall("seeds") || [];

        let message = "";

        if (seeds.length === 0) {

            message = `
Che...

Todavía no veo semillas.

Todo jardín empieza con la primera.
`;

        } else if (seeds.length === 1) {

            message = `
Che...

Ya tenemos una semilla.

No está mal.

Ahora hay que cuidarla.
`;

        } else {

            message = `
Che...

Veo ${seeds.length} semillas.

Antes de plantar otra...

preguntémonos cuál merece agua hoy.
`;

        }

        return message;

    }

}