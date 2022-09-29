import CameraComponent from '../Component/CameraComponent';
import System from '../Engine/ECS/System';

export default class RestoreCanvasContext extends System {

    // eslint-disable-next-line @typescript-eslint/ban-types
    componentsRequired = new Set<Function>([CameraComponent]);

    update(): void {
        window.ctx.restore();
    }
}
