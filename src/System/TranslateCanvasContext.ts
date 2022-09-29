import CameraComponent from '../Component/CameraComponent';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';

export default class TranslateCanvasContext extends System {

    // eslint-disable-next-line @typescript-eslint/ban-types
    componentsRequired = new Set<Function>([CameraComponent, Position]);

    update(query: Query): void {
        const components = query.one();

        window.ctx.clearRect(0, 0, window.ctx.canvas.width, window.ctx.canvas.height);
        window.ctx.save();
        window.ctx.translate(
            Math.floor(-components.get(Position).position.x),
            Math.floor(-components.get(Position).position.y),
        );
    }
}
