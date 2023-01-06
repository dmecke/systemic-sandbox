import Area from '@dmecke/game-engine/lib/Math/Area';
import CameraComponent from '../Component/CameraComponent';
import InViewport from '../Component/InViewport';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';
import Vector from '@dmecke/game-engine/lib/Math/Vector';
import config from '../assets/config.json';

export default class AddIsInViewport extends System {
    update(query: Query): void {
        const [positionComponent] = query.allComponents(Position, CameraComponent)[0];
        const cameraPosition = positionComponent.position;
        const buffer = new Vector(2, 2).multiply(config.tileSize);
        const cameraTopLeft = cameraPosition.subtract(buffer);
        const viewport = new Area(cameraTopLeft, this.cameraSize.add(buffer.multiply(2)));

        for (const [entity, positionComponent] of query.allEntities(Position)) {
            if (!query.hasComponent(entity, InViewport) && viewport.contains(positionComponent.position)) {
                this.ecs.addComponent(entity, new InViewport());
            }
        }
    }

    private get cameraSize(): Vector {
        return new Vector(window.ctx.canvas.width, window.ctx.canvas.height);
    }
}
