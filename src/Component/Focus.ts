import Component from '../Engine/ECS/Component';
import Vector from '@dmecke/game-engine/lib/Math/Vector';

export default class Focus extends Component {

    constructor(
        public position: Vector,
    ) {
        super();
    }

    static fromData(): Focus {
        return new Focus(new Vector(0, 0));
    }
}
