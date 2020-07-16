class User {

    constructor(login, password, isAuth) {

        if (!login.trim() && !password.trim()) {
            return null;
        }

        this.login = login;
        this.password = password;
        this.isAuth = !!(isAuth);
    }
}

class Auth {
    #users = [
        new User('admin', 'admin')
    ];

    #currentUser = null;

    login(login, password) {

        if (!login.trim() || !password.trim()) {
            return false;
        }

        let result = this.#users.find((item, index, array) => {
            return (item.login === login && item.password === password);
        });

        if(result) {
            this.#currentUser = new User(login, password, true);
            return true;
        }

        return false;
    }

    logout(login) {
        this.#currentUser = null;
    }

    get currentUser() {
        return this.#currentUser;
    }

    set setUser(user) {
        if(!(user instanceof User)) return false;

        let userIsset = this.#users.find((item, index, array) => {
            return (item.login === user.login);
        });

        if(!userIsset) return false;

        this.#currentUser = user;
    }

}