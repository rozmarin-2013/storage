class AuthForm {

    #selector = '.auth_form';
    #loginSelector = 'input[name=login]';
    #passwordSelector = 'input[name=password]';
    #buttonLoginSelector = 'button[name=signin]';
    #formElm = null;
    #loginElm = null;
    #passwordElm = null;
    #buttonLoginElm = null;

    constructor() {
        this.#formElm = document.querySelector(this.#selector);
        this.#loginElm = this.#formElm.querySelector(this.#loginSelector);
        this.#passwordElm = this.#formElm.querySelector(this.#passwordSelector);
        this.#buttonLoginElm = this.#formElm.querySelector(this.#buttonLoginSelector);
    }

    getAuthFormElm() {
        return this.#formElm;
    }

    getLoginElm() {
        return this.#loginElm;
    }

    getPasswordElm() {
        return this.#passwordElm;
    }

    getButtonElm() {
        return this.#buttonLoginElm;
    }
}