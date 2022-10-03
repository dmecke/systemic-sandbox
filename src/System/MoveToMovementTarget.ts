import MovementTarget from '../Component/MovementTarget';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';

export default class MoveToMovementTarget extends System {

    // eslint-disable-next-line @typescript-eslint/ban-types
    componentsRequired = new Set<Function>([Position, MovementTarget]);

    update(query: Query): void {
        query
            .all()
            .forEach(components => {
                const positionComponent = components.get(Position);
                const targetComponent = components.get(MovementTarget);

                const direction = targetComponent.position.subtract(positionComponent.position).normalize();
                positionComponent.position = positionComponent.position.add(direction).round();
            })
        ;
    }
}
