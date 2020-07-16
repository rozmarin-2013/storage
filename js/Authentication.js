class Authentication {
    #authForm = null;
    #auth = null;
    #storage = null;
    #urlForward = null;
    #urlAuth = null;
    #idLogout = 'logout';

    constructor(configuration) {
        this.#storage = configuration.storage.auth;
        this.#auth = configuration.auth;
        this.#urlForward = configuration.urlForward;
        this.#urlAuth = configuration.urlAuth;

        this.init();
    }

    init() {
        if (this.#storage.get('login')) {

            this.#auth.setUser = new User(
                this.#storage.get('login'),
                this.#storage.get('password'),
                true
            );

            if (window.location.origin + '/' === window.location.href) {
                window.location.href = `${window.location.href}${this.#urlForward}`;
            }

            this.logout();
        } else {

            if (window.location.href !== `${window.location.origin}${this.#urlAuth}`) {
                window.location.href = `${window.location.origin}${this.#urlAuth}`;
            }

            this.#authForm = new AuthForm();
            this.login();
        }
    }

    logout() {
        document.getElementById(this.#idLogout).addEventListener(

            'click',
            () => {
                this.#storage.delete('login');
                this.#storage.delete('password');
                this.#auth.logout();
                window.location.href = `${window.location.origin}${this.#urlAuth}`;
            }
        );
    }

    login() {
        this.#authForm.getButtonElm().addEventListener(
            'click', () => {
                let login = this.#authForm.getLoginElm().value,
                    password = this.#authForm.getPasswordElm().value;

                let isLogin = this.#auth.login(
                    login,
                    password
                );

                if (isLogin) {
                    this.#storage.set('login', login);
                    this.#storage.set('password', password);
                }

                window.location.href = `${window.location.href}${this.#urlForward}`;
            });
    }
}