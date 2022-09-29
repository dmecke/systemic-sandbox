export default class TreeMap {
    private map = new Map();

    add(x: number, y: number): void {
        this.map.set(`${x}|${y}`, true);
    }

    get(x: number, y: number): boolean {
        return this.map.has(`${x}|${y}`);
    }
}
