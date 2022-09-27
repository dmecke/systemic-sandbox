import config from './assets/config.json';

export default class MoistureMapRenderer {
    constructor(
        private readonly moistureMap: number[][],
        private readonly context: CanvasRenderingContext2D,
    ) {
    }

    render(): void {
        const size = config.generation.size;
        for (let y = 0; y < size.y; y++) {
            for (let x = 0; x < size.x; x++) {
                this.context.fillStyle = `rgba(0, 0, 255, ${this.moistureMap[y][x]})`;
                this.context.fillRect(x, y, 1, 1);
            }
        }
    }
}
