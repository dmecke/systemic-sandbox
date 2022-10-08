import Vector from './Vector';

export default class Circle {
    constructor(
        readonly position: Vector,
        readonly radius: number,
    ) {
    }

    get diameter(): number {
        return this.radius * 2;
    }
}
