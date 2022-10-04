import Vector from '../Engine/Math/Vector';

export default class Direction {

    private constructor(
        private readonly direction: string,
    ) {
    }

    static southEast(): Direction {
        return new Direction('se');
    }

    static southWest(): Direction {
        return new Direction('sw');
    }

    static northEast(): Direction {
        return new Direction('ne');
    }

    static northWest(): Direction {
        return new Direction('nw');
    }

    static fromVector(vector: Vector): Direction {
        let direction = '';
        direction += vector.y >= 0 ? 's' : 'n';
        direction += vector.x >= 0 ? 'e' : 'w';

        return new Direction(direction);
    }

    static fromString(direction: string): Direction {
        return new Direction(direction);
    }

    toString(): string {
        return this.direction;
    }

    get spriteRow(): number {
        switch (this.direction) {
            case 'se':
                return 0;

            case 'sw':
                return 1;

            case 'ne':
                return 2;

            case 'nw':
                return 3;
        }

        throw new Error(`Invalid direction: "${this.direction}".`);
    }
}
