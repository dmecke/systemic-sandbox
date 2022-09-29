import Component from '../Engine/ECS/Component';
import Vector from '../Engine/Math/Vector';

export default class Sprite extends Component {

    constructor(
        public image: string,
        public anchor: Vector,
    ) {
        super();
    }

    static fromData(data: { image: string, anchor: { x: number, y: number } }): Sprite {
        return new Sprite(data.image, new Vector(data.anchor.x, data.anchor.y));
    }
}
