export default class User {
    constructor(username, password, fullName, admin, ) {
        this.username = username;
        this.password = password;
        this.fullName = fullName;
        this.admin = admin;
    }


    isAdmin() {
        return this.admin;
    }
}