import Component from '../Engine/ECS/Component';
import Vector from '../Engine/Math/Vector';

export default class MovementTarget extends Component {

    constructor(
        public position: Vector,
    ) {
        super();
    }

    static fromData(data: { x: number, y: number }): MovementTarget {
        return new MovementTarget(new Vector(data.x, data.y));
    }
}
