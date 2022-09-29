import Biome from '../Biome/Biome';
import config from '../assets/config.json';

export default class BiomeRenderer {
    constructor(
        private readonly biomeMap: Biome[][],
        private readonly context: CanvasRenderingContext2D,
    ) {
    }

    render(): void {
        const size = config.generation.size;
        for (let y = 0; y < size.y; y++) {
            for (let x = 0; x < size.x; x++) {
                this.context.fillStyle = this.biomeMap[y][x].color;
                this.context.fillRect(x, y, 1, 1);
            }
        }
    }
}
