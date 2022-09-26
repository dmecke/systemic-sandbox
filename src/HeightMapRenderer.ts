export default class HeightMapRenderer {
    constructor(
        private readonly size: { width: number, height: number },
        private readonly heightMap: number[][],
        private readonly context: CanvasRenderingContext2D,
    ) {
    }

    render(): void {
        for (let y = 0; y < this.size.height; y++) {
            for (let x = 0; x < this.size.width; x++) {
                const gray = this.heightMap[y][x] * 255;
                this.context.fillStyle = `rgb(${gray}, ${gray}, ${gray})`;
                this.context.fillRect(x, y, 1, 1);
            }
        }
    }
}
