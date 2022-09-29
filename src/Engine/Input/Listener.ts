export default class Listener {

    constructor(
        private code: string,
        private callback: () => void,
    ) {
    }

    handle(code: string): void {
        if (code !== this.code) {
            return;
        }

        this.callback();
    }
}
