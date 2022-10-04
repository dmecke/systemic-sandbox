import Vector from './Vector';

export default class Area {

    constructor(
        readonly position: Vector,
        readonly size: Vector,
    ) {
    }

    static around(position: Vector, range: number): Area {
        return new Area(position.subtract(new Vector(range, range)), new Vector(range, range).multiply(2));
    }

    contains(position: Vector): boolean {
        if (position.x < this.position.x) {
            return false;
        }

        if (position.y < this.position.y) {
            return false;
        }

        if (position.x >= this.position.x + this.size.x) {
            return false;
        }

        if (position.y >= this.position.y + this.size.y) {
            return false;
        }

        return true;
    }

    get left(): number {
        return this.position.x;
    }

    get right(): number {
        return this.position.x + this.size.x;
    }

    get top(): number {
        return this.position.y;
    }

    get bottom(): number {
        return this.position.y + this.size.y;
    }

    get center(): Vector {
        return this.position.add(this.size.divide(2));
    }

    overlaps(other: Area): boolean {
        if (this.left > other.right) {
            return false;
        }

        if (other.left > this.right) {
            return false;
        }

        if (this.top > other.bottom) {
            return false;
        }

        if (other.top > this.bottom) {
            return false;
        }

        return true;
    }

    toString(): string {
        return `${this.position.toString()} - ${this.position.add(this.size).toString()}`;
    }
}
