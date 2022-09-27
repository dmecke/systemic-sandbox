import config from './assets/config.json';

export default class HeightMapRenderer {
    constructor(
        private readonly heightMap: number[][],
        private readonly context: CanvasRenderingContext2D,
    ) {
    }

    render(): void {
        const size = config.generation.size;
        for (let y = 0; y < size.y; y++) {
            for (let x = 0; x < size.x; x++) {
                const gray = this.heightMap[y][x] * 255;
                this.context.fillStyle = `rgb(${gray}, ${gray}, ${gray})`;
                this.context.fillRect(x, y, 1, 1);
            }
        }
    }
}
