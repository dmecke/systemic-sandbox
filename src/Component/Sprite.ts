import Component from '../Engine/ECS/Component';
import Vector from '../Engine/Math/Vector';

export default class Sprite extends Component {

    constructor(
        public image: string,
        public anchor: Vector,
        public size: Vector,
        public offset: Vector,
        public zIndex: number,
    ) {
        super();
    }

    static fromData(data: { image: string, anchor: { x: number, y: number }, size: { x: number, y: number }, offset: { x: number, y: number }, zIndex: number }): Sprite {
        return new Sprite(
            data.image,
            new Vector(data.anchor.x, data.anchor.y),
            new Vector(data.size.x, data.size.y),
            data.offset ? new Vector(data.offset.x ?? 0, data.offset.y ?? 0) : new Vector(0, 0),
            data.zIndex ?? 1,
        );
    }
}
