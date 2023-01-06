import Vector from '@dmecke/game-engine/lib/Math/Vector';

export default class VectorMap {
    private map: Map<number, Map<number, Vector>> = new Map();

    set(x: number, y: number, vector: Vector): void {
        if (!this.map.has(x)) {
            this.map.set(x, new Map());
        }

        this.map.get(x).set(y, vector);
    }

    get(x: number, y: number): Vector {
        return this.map.get(x).get(y);
    }
}
