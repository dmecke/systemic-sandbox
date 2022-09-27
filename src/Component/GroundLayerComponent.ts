import Component from '../Engine/ECS/Component';
import Entity from '../Engine/ECS/Entity';

export default class GroundLayerComponent extends Component {

    constructor(
        readonly heightMap: number[][],
        readonly moistureMap: number[][],
        readonly offset: number[][],
        readonly camera: Entity,
    ) {
        super();
    }
}
