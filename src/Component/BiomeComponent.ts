import BiomeMap from '../ProceduralGeneration/BiomeMap';
import Component from '../Engine/ECS/Component';
import Grid from '@dmecke/game-engine/lib/Type/Grid';
import Vector from '@dmecke/game-engine/lib/Math/Vector';

export default class BiomeComponent extends Component {

    constructor(
        readonly biomeMap: BiomeMap,
        readonly spriteOffsets: Grid<Vector>,
    ) {
        super();
    }
}
