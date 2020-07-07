class Error {
    constructor(code, title, message) {
        this.code = code;
        this.title = title;
        this.message = message;
        this.error = null;
    }

    setErrorStack(error) {
        this.error = error
    }
}