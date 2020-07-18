export default class Alert {
    constructor(code, title, message, stack, isError)  {
        this.code = code;
        this.title = title;
        this.message = message;
        this.stack = stack;
        this.display = false;
        this.isError = false;
    }

    setStack(stack) {
        this.stack = stack;
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
}