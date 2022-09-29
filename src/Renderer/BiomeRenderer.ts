import BiomeMap from '../ProceduralGeneration/BiomeMap';
import config from '../assets/config.json';

export default class BiomeRenderer {
    constructor(
        private readonly biomeMap: BiomeMap,
        private readonly context: CanvasRenderingContext2D,
    ) {
    }

    render(): void {
        const size = config.generation.size;
        for (let y = 0; y < size.y; y++) {
            for (let x = 0; x < size.x; x++) {
                this.context.fillStyle = this.biomeMap.get(x, y).color;
                this.context.fillRect(x, y, 1, 1);
            }
        }
    }
}
