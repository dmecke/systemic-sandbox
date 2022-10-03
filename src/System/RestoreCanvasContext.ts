import System from '../Engine/ECS/System';

export default class RestoreCanvasContext extends System {
    update(): void {
        window.ctx.restore();
    }
}
