import CameraComponent from '../Component/CameraComponent';
import ComponentContainer from '../Engine/ECS/ComponentContainer';
import Focus from '../Component/Focus';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';
import Vector from '../Engine/Math/Vector';

export default class CameraPositionUpdater extends System {

    // eslint-disable-next-line @typescript-eslint/ban-types
    componentsRequired = new Set<Function>([CameraComponent, Position, Focus]);

    update(query: Query): void {
        const components = query.one();

        const currentPosition = components.get(Focus).position.subtract(this.center);

        const diff = components.get(Position).position.subtract(currentPosition);

        components.get(Position).position = components.get(Position).position.subtract(diff.divide(this.smoothing(components, currentPosition)));
    }

    private get canvasSize(): Vector {
        return new Vector(window.ctx.canvas.width, window.ctx.canvas.height);
    }

    private get center(): Vector {
        return this.canvasSize.divide(2);
    }

    private smoothing(camera: ComponentContainer, currentPosition: Vector): number {
        return Math.max(1, Math.floor(Math.sqrt(camera.get(Position).position.distanceTo(currentPosition))));
    }
}
