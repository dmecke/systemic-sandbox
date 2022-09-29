import ImageLoader from '../Engine/Assets/ImageLoader';
import config from '../assets/config.json';
import factory from '../Biome/Factory';

export default class TileRenderer {
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
                const biome = factory(this.heightMap[y][x], this.moistureMap[y][x]);
                const img = ImageLoader.instance.getImage(`tiles/${biome.image}`);
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
