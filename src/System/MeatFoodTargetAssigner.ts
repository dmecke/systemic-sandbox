import Circle from '@dmecke/game-engine/lib/Math/Circle';
import EatsMeat from '../Component/EatsMeat';
import Food from '../Component/Food';
import Hunger from '../Component/Hunger';
import Meat from '../Component/Meat';
import MovementTarget from '../Component/MovementTarget';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';
import config from '../assets/config.json';

export default class MeatFoodTargetAssigner extends System {
    update(query: Query): void {
        for (const [checkingEntity, hunger, position] of query.allEntities(Hunger, Position, EatsMeat)) {
            if (hunger.hunger > 50) {
                if (!this.ecs.query.hasComponents(checkingEntity, MovementTarget)) {
                    const targets = this
                        .ecs
                        .query
                        .allComponentsAt(new Circle(position.position, 5 * config.tileSize), Meat, Food, Position)
                    ;
                    if (targets.length > 0) {
                        this.ecs.addComponent(checkingEntity, new MovementTarget((targets[0][2] as Position).position));
                    }
                }
            }
        }
    }
}
