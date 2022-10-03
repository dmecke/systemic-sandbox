import BiomeMap from '../ProceduralGeneration/BiomeMap';
import Component from '../Engine/ECS/Component';
import NumberMap from '../ProceduralGeneration/NumberMap';

export default class BiomeComponent extends Component {

    constructor(
        readonly biomeMap: BiomeMap,
        readonly spriteOffsets: NumberMap,
    ) {
        super();
    }
}
