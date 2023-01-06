import Circle from '@dmecke/game-engine/lib/Math/Circle';
import EatsPlants from '../Component/EatsPlants';
import Food from '../Component/Food';
import Hunger from '../Component/Hunger';
import MovementTarget from '../Component/MovementTarget';
import Plant from '../Component/Plant';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';
import config from '../assets/config.json';

export default class PlantFoodTargetAssigner extends System {
    update(query: Query): void {
        for (const [checkingEntity, hunger, position] of query.allEntities(Hunger, Position, EatsPlants)) {
            if (hunger.hunger > 50) {
                if (!query.hasComponent(checkingEntity, MovementTarget)) {
                    const targets = this
                        .ecs
                        .query
                        .allComponentsAt(new Circle(position.position, 5 * config.tileSize), Plant, Food, Position)
                    ;
                    if (targets.length > 0) {
                        this.ecs.addComponent(checkingEntity, new MovementTarget((targets[0][2] as Position).position));
                    }
                }
            }
        }
    }
}
