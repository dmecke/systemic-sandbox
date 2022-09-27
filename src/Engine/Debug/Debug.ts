export default class Debug {

    private static KEY = 'debug';

    settings: object = {};

    constructor() {
        const data = window.localStorage.getItem(Debug.KEY);
        if (data) {
            this.settings = JSON.parse(data);
        }
    }

    get(key: string): unknown {
        return this.settings[key];
    }

    set(key: string, value: unknown): void {
        this.settings[key] = value;
        this.save();
    }

    private save(): void {
        window.localStorage.setItem(Debug.KEY, JSON.stringify(this.settings));
    }
}
