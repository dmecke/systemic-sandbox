import MovementTarget from '../Component/MovementTarget';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';

export default class MovementTargetRemover extends System {

    // eslint-disable-next-line @typescript-eslint/ban-types
    componentsRequired = new Set<Function>([MovementTarget, Position]);

    update(query: Query): void {
        for (const [entity, movementTarget, position] of query.allEntities(MovementTarget, Position)) {
            if (movementTarget.position.distanceTo(position.position) < 1) {
                this.ecs.removeComponent(entity, MovementTarget);
            }
        }
    }
}
