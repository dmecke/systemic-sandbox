import ImageLoader from './Canvas/ImageLoader';
import factory from './Biome/Factory';

export default class TileRenderer {
    constructor(
        private readonly size: { width: number, height: number },
        private readonly heightMap: number[][],
        private readonly moistureMap: number[][],
        private readonly context: CanvasRenderingContext2D,
        private readonly imageLoader: ImageLoader,
    ) {
    }

    render(): void {
        for (let y = 0; y < this.size.height; y++) {
            for (let x = 0; x < this.size.width; x++) {
                const biome = factory(this.heightMap[y][x], this.moistureMap[y][x]);
                const img = this.imageLoader.getImage(`tiles/${biome.image}`);
                this.context.drawImage(
                    img,
                    Math.floor(Math.random() * (img.width as number) / 8) * 8,
                    0,
                    8,
                    8,
                    x * 8,
                    y * 8,
                    8,
                    8,
                );
            }
        }
    }
}
