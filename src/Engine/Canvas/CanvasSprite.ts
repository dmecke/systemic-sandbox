import Vector from '../Math/Vector';

export default class CanvasSprite {

    constructor(
        readonly image: HTMLImageElement,
        private readonly offset: Vector,
        private readonly size: Vector,
        private readonly position: Vector,
    ) {
    }

    draw(ctx: CanvasRenderingContext2D = window.ctx): void {
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
