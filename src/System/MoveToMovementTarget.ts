import CanMove from '../Component/CanMove';
import MovementTarget from '../Component/MovementTarget';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';

export default class MoveToMovementTarget extends System {
    update(query: Query): void {
        for (const [positionComponent, targetComponent, canMove] of query.allComponents(Position, MovementTarget, CanMove)) {
            const direction = targetComponent.position.subtract(positionComponent.position).normalize().multiply(canMove.maxSpeed);
            positionComponent.position = positionComponent.position.add(direction);
        }
    }
}
