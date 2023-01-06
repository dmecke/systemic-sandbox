import Component from '../Engine/ECS/Component';
import Vector from '@dmecke/game-engine/lib/Math/Vector';

export default class Position extends Component {

    constructor(
        public position: Vector,
    ) {
        super();
    }

    static fromData(data: { x: number, y: number }): Position {
        return new Position(new Vector(data.x ?? 0, data.y ?? 0));
    }
}
