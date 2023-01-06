import Vector from '@dmecke/game-engine/lib/Math/Vector';

export default class TreeMap {
    private map = new Map();

    add(x: number, y: number): void {
        this.map.set(`${x}|${y}`, true);
    }

    get(x: number, y: number): boolean {
        return this.map.has(`${x}|${y}`);
    }

    all(): Vector[] {
        return Array.from(this.map.keys()).map(key => {
            const position = key.split('|');

            return new Vector(position[0], position[1]);
        });
    }
}
