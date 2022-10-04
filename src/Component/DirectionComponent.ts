import Component from '../Engine/ECS/Component';
import Direction from '../Map/Direction';

export default class DirectionComponent extends Component {
    constructor(
        public direction: Direction,
    ) {
        super();
    }

    static fromData(): DirectionComponent {
        return new DirectionComponent(Direction.southEast());
    }
}
