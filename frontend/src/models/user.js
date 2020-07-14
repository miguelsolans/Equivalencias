export default class User {
    constructor(username, fullName, admin, email, password)  {
        this.username = username;
        this.fullName = fullName;
        this.admin = admin;
        this.email = email;
        this.password = password;
    }


    isAdmin() {
        return this.admin;
    }
}