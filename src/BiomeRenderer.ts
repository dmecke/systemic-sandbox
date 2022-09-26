import factory from './Biome/Factory';

export default class BiomeRenderer {
    constructor(
        private readonly size: { width: number, height: number },
        private readonly heightMap: number[][],
        private readonly moistureMap: number[][],
        private readonly context: CanvasRenderingContext2D,
    ) {
    }

    render(): void {
        for (let y = 0; y < this.size.height; y++) {
            for (let x = 0; x < this.size.width; x++) {
                this.context.fillStyle = factory(this.heightMap[y][x], this.moistureMap[y][x]).color;
                this.context.fillRect(x, y, 1, 1);
            }
        }
    }
}
