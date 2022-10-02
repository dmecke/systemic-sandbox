import Area from '../Engine/Math/Area';
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
        const [positionComponent] = this.ecs.queryAll(Position, CameraComponent)[0];
        const cameraPosition = positionComponent.position;
        const buffer = new Vector(2, 2).multiply(config.tileSize);
        const cameraTopLeft = cameraPosition.subtract(buffer);
        const viewport = new Area(cameraTopLeft, this.cameraSize.add(buffer.multiply(2)));

        query
            .entities()
            .forEach(entity => {
                const components = this.ecs.getComponents(entity);
                const isInViewport = viewport.contains(components.get(Position).position);

                if (components.has(IsInViewport)) {
                    if (!isInViewport) {
                        this.ecs.removeComponent(entity, IsInViewport);
                    }
                } else {
                    if (isInViewport) {
                        this.ecs.addComponent(entity, new IsInViewport());
                    }
                }
            })
        ;
    }

    private get cameraSize(): Vector {
        return new Vector(window.ctx.canvas.width, window.ctx.canvas.height);
    }
}
