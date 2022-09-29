import BiomeMap from '../ProceduralGeneration/BiomeMap';
import Component from '../Engine/ECS/Component';
import Entity from '../Engine/ECS/Entity';
import TreeMap from '../ProceduralGeneration/TreeMap';

export default class TreeLayerComponent extends Component {

    constructor(
        readonly biomeMap: BiomeMap,
        readonly treeMap: TreeMap,
        readonly camera: Entity,
    ) {
        super();
    }
}
