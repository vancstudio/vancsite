class Storage {

    static save(key, value) {

        localStorage.setItem(key, JSON.stringify(value));

    }

    static load(key) {

        const value = localStorage.getItem(key);

        if (value === null) {

            return null;

        }

        return JSON.parse(value);

    }

    static remove(key) {

        localStorage.removeItem(key);

    }

    static clear() {

        localStorage.clear();

    }

}