import ImageLoader from './ImageLoader';
import Vector from '../Engine/Math/Vector';

export default class CanvasSprite {

    static readonly imageLoader = new ImageLoader();

    private constructor(
        readonly image: HTMLImageElement,
        private readonly offset: Vector,
        private readonly size: Vector,
        private readonly position: Vector,
    ) {
    }

    static fromName(image: string, offset: Vector, size: Vector, position: Vector): CanvasSprite {
        return new CanvasSprite(CanvasSprite.imageLoader.getImage(image), offset, size, position);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(
            this.image,
            this.offset.x,
            this.offset.y,
            this.size.x,
            this.size.y,
            this.position.x,
            this.position.y,
            this.size.x,
            this.size.y,
        );
    }
}
