import Food from '../Component/Food';
import Hunger from '../Component/Hunger';
import MovementTarget from '../Component/MovementTarget';
import Plant from '../Component/Plant';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';

export default class FoodTargetAssigner extends System {
    // eslint-disable-next-line @typescript-eslint/ban-types
    componentsRequired = new Set<Function>([Hunger, Position]);

    update(query: Query): void {
        const plants = query.allComponents(Position, Plant, Food);
        if (plants.length === 0) {
            return;
        }

        for (const [entity, hunger, position] of query.allEntities(Hunger, Position)) {
            if (hunger.hunger > 50) {
                plants.sort(([positionA], [positionB]) => positionA.position.distanceSquaredTo(position.position) - positionB.position.distanceSquaredTo(position.position));
                const [targetPosition] = plants[0];
                this.ecs.removeComponent(entity, MovementTarget);
                this.ecs.addComponent(entity, new MovementTarget(targetPosition.position));
            }
        }
    }
}
