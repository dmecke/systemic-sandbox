import Direction from '../Map/Direction';
import DirectionComponent from '../Component/DirectionComponent';
import MovementTarget from '../Component/MovementTarget';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';

export default class AdjustDirection extends System {
    update(query: Query): void {
        for (const [position, directionComponent, movementTarget] of query.allComponents(Position, DirectionComponent, MovementTarget)) {
            directionComponent.direction = Direction.fromVector(movementTarget.position.subtract(position.position));
        }
    }
}
