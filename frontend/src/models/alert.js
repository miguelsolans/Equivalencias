export default class Alert {
    constructor(code, title, message, stack, isError)  {
        this.code = code;
        this.title = title;
        this.message = message;
        this.stack = stack;
        this.display = false;
        this.isError = isError;
        this.type = "";
    }

    setStack(stack) {
        this.stack = stack;
    }

    setTitle(title) {
        this.title = title;
    }

    setMessage(message) {
        this.message = message;
    }

    setHttpCode(code) {
        this.code = code;
    }

    displayAlert() {
        this.display = true;
    }

    hideAlert() {
        this.display = false;
    }

    getType() {
        return this.isError ? 'error' : 'info';
    }
}