import CameraComponent from '../Component/CameraComponent';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';

export default class TranslateCanvasContext extends System {
    update(query: Query): void {
        const [positionComponent] = query.oneComponent(Position, CameraComponent);

        window.ctx.clearRect(0, 0, window.ctx.canvas.width, window.ctx.canvas.height);
        window.ctx.save();
        window.ctx.translate(
            Math.floor(-positionComponent.position.x),
            Math.floor(-positionComponent.position.y),
        );
    }
}
