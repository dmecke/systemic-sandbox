import CameraComponent from '../Component/CameraComponent';
import IsInViewport from '../Component/IsInViewport';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';
import Vector from '../Engine/Math/Vector';
import config from '../assets/config.json';

export default class UpdateIsInViewport extends System {

    // eslint-disable-next-line @typescript-eslint/ban-types
    componentsRequired = new Set<Function>([Position]);

    update(query: Query): void {
        const [cameraComponent] = this.ecs.queryAll(Position, CameraComponent)[0];
        const cameraPosition = cameraComponent.position;
        const buffer = new Vector(2, 2).multiply(config.tileSize);
        const cameraTopLeft = cameraPosition.subtract(buffer);
        const cameraBottomRight = cameraTopLeft.add(this.cameraSize).add(buffer.multiply(2));

        query
            .entities()
            .filter(entity => this.ecs.getComponents(entity).has(IsInViewport))
            .filter(entity => !this.isInViewport(this.ecs.getComponents(entity).get(Position).position, cameraTopLeft, cameraBottomRight))
            .forEach(entity => this.ecs.removeComponent(entity, IsInViewport))
        ;

        query
            .entities()
            .filter(entity => this.isInViewport(this.ecs.getComponents(entity).get(Position).position, cameraTopLeft, cameraBottomRight))
            .filter(entity => !this.ecs.getComponents(entity).has(IsInViewport))
            .forEach(entity => this.ecs.addComponent(entity, new IsInViewport()))
        ;
    }

    private isInViewport(position: Vector, cameraTopLeft: Vector, cameraBottomRight: Vector): boolean {
        if (position.x < cameraTopLeft.x) {
            return false;
        }

        if (position.x > cameraBottomRight.x) {
            return false;
        }

        if (position.y < cameraTopLeft.y) {
            return false;
        }

        if (position.y > cameraBottomRight.y) {
            return false;
        }

        return true;
    }

    private get cameraSize(): Vector {
        return new Vector(window.ctx.canvas.width, window.ctx.canvas.height);
    }
}
