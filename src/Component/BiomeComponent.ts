import BiomeMap from '../ProceduralGeneration/BiomeMap';
import Component from '../Engine/ECS/Component';
import VectorMap from '../ProceduralGeneration/VectorMap';

export default class BiomeComponent extends Component {

    constructor(
        readonly biomeMap: BiomeMap,
        readonly spriteOffsets: VectorMap,
    ) {
        super();
    }
}
