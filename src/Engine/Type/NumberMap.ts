export default class NumberMap {
    private map: Map<number, Map<number, number>> = new Map();

    set(x: number, y: number, number: number): void {
        if (!this.map.has(x)) {
            this.map.set(x, new Map());
        }

        this.map.get(x).set(y, number);
    }

    get(x: number, y: number): number {
        return this.map.get(x).get(y);
    }
}
