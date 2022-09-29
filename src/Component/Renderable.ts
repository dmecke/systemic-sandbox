import Component from '../Engine/ECS/Component';
import Entity from '../Engine/ECS/Entity';

export default class Renderable extends Component {

    constructor(
        readonly camera: Entity,
    ) {
        super();
    }
}
