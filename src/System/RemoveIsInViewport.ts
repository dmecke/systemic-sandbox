import Area from '../Engine/Math/Area';
import CameraComponent from '../Component/CameraComponent';
import InViewport from '../Component/InViewport';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';
import Vector from '../Engine/Math/Vector';
import config from '../assets/config.json';

export default class RemoveIsInViewport extends System {

    // eslint-disable-next-line @typescript-eslint/ban-types
    componentsRequired = new Set<Function>([Position, InViewport]);

    update(query: Query): void {
        const [positionComponent] = query.allComponents(Position, CameraComponent)[0];
        const cameraPosition = positionComponent.position;
        const buffer = new Vector(2, 2).multiply(config.tileSize);
        const cameraTopLeft = cameraPosition.subtract(buffer);
        const viewport = new Area(cameraTopLeft, this.cameraSize.add(buffer.multiply(2)));

        for (const [entity, positionComponent] of query.allEntities(Position, InViewport)) {
            if (!viewport.contains(positionComponent.position)) {
                this.ecs.removeComponent(entity, InViewport);
            }
        }
    }

    private get cameraSize(): Vector {
        return new Vector(window.ctx.canvas.width, window.ctx.canvas.height);
    }
}
