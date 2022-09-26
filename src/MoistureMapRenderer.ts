export default class MoistureMapRenderer {
    constructor(
        private readonly size: { width: number, height: number },
        private readonly moistureMap: number[][],
        private readonly context: CanvasRenderingContext2D,
    ) {
    }

    render(): void {
        for (let y = 0; y < this.size.height; y++) {
            for (let x = 0; x < this.size.width; x++) {
                this.context.fillStyle = `rgba(0, 0, 255, ${this.moistureMap[y][x]})`;
                this.context.fillRect(x, y, 1, 1);
            }
        }
    }
}
