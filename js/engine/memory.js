class MemoryEngine {

    constructor() {

        this.name = "Memory";
        this.version = "1.0.0";
        this.status = "OFFLINE";

    }

    init() {

        this.status = "ONLINE";

    }

    remember(key, value) {

        Storage.save(key, value);

    }

    recall(key) {

        return Storage.load(key);

    }

    forget(key) {

        Storage.remove(key);

    }

}