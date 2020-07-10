module.exports = class Error {
    constructor(code, title, message) {
        this.code = code;
        this.title = title;
        this.message = message;
        this.error = null;
    }

    setErrorStack(error) {
        this.error = error;
    }

    getHttpCode() {
        return this.code;
    }

    getBody() {
        let body = {
            title: this.title,
            message: this.message,
            error: this.error
        };

        if(this.error == null) {
            console.log("Removing Body");
            delete body["error"];
        }

        return body;
    }
}

