export default class Error {
    constructor(title, message, error)  {
        this.title = title;
        this.message = message;
        this.error = error;
    }


    isAdmin() {
        return this.admin;
    }
}