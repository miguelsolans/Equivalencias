export default class Error {
    constructor(code, title, message, error)  {
        this.code = code;
        this.title = title;
        this.message = message;
        this.error = error;
    }

    setErrorStack(error) {
        this.error = error;
    }

    setHttpCode(code) {
        this.code = code;
    }
}