import BiomeMap from '../ProceduralGeneration/BiomeMap';
import Component from '../Engine/ECS/Component';
import Entity from '../Engine/ECS/Entity';
import NumberMap from '../ProceduralGeneration/NumberMap';

export default class GroundLayerComponent extends Component {

    constructor(
        readonly biomeMap: BiomeMap,
        readonly sprite: NumberMap,
        readonly camera: Entity,
    ) {
        super();
    }
}
