import CameraComponent from '../Component/CameraComponent';
import CameraTarget from '../Component/CameraTarget';
import Focus from '../Component/Focus';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';
import Vector from '../Engine/Math/Vector';

export default class CameraFocusUpdater extends System {

    // eslint-disable-next-line @typescript-eslint/ban-types
    componentsRequired = new Set<Function>([Position, CameraTarget]);

    update(query: Query): void {
        let target = new Vector(0, 0);
        query.all().forEach(components => {
            const position = components.get(Position);
            target = target.add(position.position);
        });

        for (const [focusComponent] of this.ecs.queryAll(Focus, CameraComponent)) {
            focusComponent.position = target.divide(query.size);
        }
    }
}
