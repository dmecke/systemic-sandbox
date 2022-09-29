export default class NumberMap {
    private map = new Map();

    set(x: number, y: number, number: number): void {
        this.map.set(`${x}|${y}`, number);
    }

    get(x: number, y: number): number {
        return this.map.get(`${x}|${y}`);
    }
}
