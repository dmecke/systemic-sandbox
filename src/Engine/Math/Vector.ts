export default class Vector {

    public constructor(
        private readonly _x: number,
        private readonly _y: number,
    ) {
    }

    public static null() {
        return new Vector(0, 0);
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    public toString(): string {
        return this._x + '|' + this._y;
    }

    public equals(other: Vector): boolean {
        return this._x === other._x && this._y === other._y;
    }

    public isNull(): boolean {
        return this.equals(new Vector(0, 0));
    }

    public add(other: Vector): Vector {
        return new Vector(this._x + other._x, this._y + other._y);
    }

    public addX(x: number): Vector {
        return new Vector(this._x + x, this._y);
    }

    public addY(y: number): Vector {
        return new Vector(this._x, this._y + y);
    }

    public subtract(other: Vector): Vector {
        return new Vector(this._x - other._x, this._y - other._y);
    }

    public subtractX(x: number): Vector {
        return new Vector(this._x - x, this._y);
    }

    public subtractY(y: number): Vector {
        return new Vector(this._x, this._y - y);
    }

    public multiply(multiplier: number): Vector {
        return new Vector(this._x * multiplier, this._y * multiplier);
    }

    public multiplyX(multiplier: number): Vector {
        return new Vector(this._x * multiplier, this._y);
    }

    public multiplyY(multiplier: number): Vector {
        return new Vector(this._x, this._y * multiplier);
    }

    public divide(divisor: number): Vector {
        if (divisor === 0) {
            throw new Error('Cannot divide by zero.');
        }

        return new Vector(this._x / divisor, this._y / divisor);
    }

    public length(): number {
        return Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2));
    }

    public normalize(): Vector {
        if (this.length() === 0) {
            return Vector.null();
        }

        return this.divide(this.length());
    }

    public perpendicular(): Vector {
        return new Vector(this._y, this._x);
    }

    public distanceTo(other: Vector): number {
        return Math.sqrt(this.distanceSquaredTo(other));
    }

    public distanceSquaredTo(other: Vector): number {
        return Math.pow(this._x - other._x, 2) + Math.pow(this._y - other._y, 2);
    }

    public round(): Vector {
        return new Vector(Math.round(this._x), Math.round(this._y));
    }

    public floor(): Vector {
        return new Vector(Math.floor(this._x), Math.floor(this._y));
    }

    public ceil(): Vector {
        return new Vector(Math.ceil(this._x), Math.ceil(this._y));
    }
}
