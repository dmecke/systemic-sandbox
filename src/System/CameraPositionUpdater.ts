import CameraComponent from '../Component/CameraComponent';
import Focus from '../Component/Focus';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';
import Vector from '../Engine/Math/Vector';

export default class CameraPositionUpdater extends System {

    // eslint-disable-next-line @typescript-eslint/ban-types
    componentsRequired = new Set<Function>([CameraComponent, Position, Focus]);

    update(query: Query): void {
        const [focus, positionComponent] = query.oneComponent(Focus, Position, CameraComponent);

        const currentPosition = focus.position.subtract(this.center);

        const diff = positionComponent.position.subtract(currentPosition);

        positionComponent.position = positionComponent.position.subtract(diff.divide(this.smoothing(positionComponent, currentPosition)));
    }

    private get canvasSize(): Vector {
        return new Vector(window.ctx.canvas.width, window.ctx.canvas.height);
    }

    private get center(): Vector {
        return this.canvasSize.divide(2);
    }

    private smoothing(positionComponent: Position, currentPosition: Vector): number {
        return Math.max(1, Math.floor(Math.sqrt(positionComponent.position.distanceTo(currentPosition))));
    }
}
