import Vector from '@dmecke/game-engine/lib/Math/Vector';

export default class Glyph {

    constructor(
        private readonly x: number,
        private readonly y: number,
        private readonly width: number,
        private readonly height: number,
    ) {
    }

    get position(): Vector {
        return new Vector(this.x, this.y);
    }

    get size(): Vector {
        return new Vector(this.width, this.height);
    }
}
