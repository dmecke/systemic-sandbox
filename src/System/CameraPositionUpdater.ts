import CameraComponent from '../Component/CameraComponent';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';
import Vector from '../Engine/Math/Vector';
import config from '../assets/config.json';

export default class CameraPositionUpdater extends System {

    private direction = new Vector(1, 1);

    // eslint-disable-next-line @typescript-eslint/ban-types
    componentsRequired = new Set<Function>([CameraComponent, Position]);

    update(query: Query): void {
        const components = query.one();
        const positionComponent = components.get(Position);

        if (positionComponent.position.x + this.cameraSize.x >= config.generation.size.x * config.tileSize) {
            this.direction = new Vector(-1, this.direction.y);
        }

        if (positionComponent.position.x <= 0) {
            this.direction = new Vector(1, this.direction.y);
        }

        if (positionComponent.position.y + this.cameraSize.y >= config.generation.size.y * config.tileSize) {
            this.direction = new Vector(this.direction.x, -1);
        }

        if (positionComponent.position.y <= 0) {
            this.direction = new Vector(this.direction.x, 1);
        }

        positionComponent.position = positionComponent.position.add(this.direction);
    }

    private get cameraSize(): Vector {
        return new Vector(window.ctx.canvas.width, window.ctx.canvas.height).ceil();
    }
}
