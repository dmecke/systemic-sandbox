import EatsMeat from '../Component/EatsMeat';
import Food from '../Component/Food';
import Hunger from '../Component/Hunger';
import Meat from '../Component/Meat';
import MovementTarget from '../Component/MovementTarget';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';

export default class MeatFoodTargetAssigner extends System {
    update(query: Query): void {
        const meat = query.allComponents(Position, Meat, Food);
        if (meat.length === 0) {
            return;
        }

        for (const [entity, hunger, position] of query.allEntities(Hunger, Position, EatsMeat)) {
            if (hunger.hunger > 50) {
                meat.sort(([positionA], [positionB]) => positionA.position.distanceSquaredTo(position.position) - positionB.position.distanceSquaredTo(position.position));
                const [targetPosition] = meat[0];
                this.ecs.removeComponent(entity, MovementTarget);
                this.ecs.addComponent(entity, new MovementTarget(targetPosition.position));
            }
        }
    }
}
