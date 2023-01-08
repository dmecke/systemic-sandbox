import BiomeMap from '../ProceduralGeneration/BiomeMap';
import Component from '../Engine/ECS/Component';
import VectorGrid from '../Engine/Type/Grid/VectorGrid';

export default class BiomeComponent extends Component {

    constructor(
        readonly biomeMap: BiomeMap,
        readonly spriteOffsets: VectorGrid,
    ) {
        super();
    }
}
