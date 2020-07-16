class Storage {
    get() {}

    set() {}

    delete() {}
}

class CookieStorage extends Storage {

    get(name) {

        super.get();

        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    set(name, value, options = {}) {

        super.set();

        options = {
            path: '/',
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }

        document.cookie = updatedCookie;
    }

    delete(name) {

        super.delete();

        this.set(name, "", {
            'max-age': -1
        });
    }
}

class LocStorage extends Storage {

    set(name, value,) {
        super.set();

        localStorage.setItem(name, JSON.stringify(value));
    }

    get(key) {
        super.get();

        return localStorage[key];
    }

    delete(key) {
        super.delete();

        delete localStorage[key];
    }
}