import config from './assets/config.json';
import factory from './Biome/Factory';

export default class BiomeRenderer {
    constructor(
        private readonly heightMap: number[][],
        private readonly moistureMap: number[][],
        private readonly context: CanvasRenderingContext2D,
    ) {
    }

    render(): void {
        const size = config.generation.size;
        for (let y = 0; y < size.y; y++) {
            for (let x = 0; x < size.x; x++) {
                this.context.fillStyle = factory(this.heightMap[y][x], this.moistureMap[y][x]).color;
                this.context.fillRect(x, y, 1, 1);
            }
        }
    }
}
