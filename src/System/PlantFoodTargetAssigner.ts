import Circle from '../Engine/Math/Circle';
import EatsPlants from '../Component/EatsPlants';
import Entity from '../Engine/ECS/Entity';
import Food from '../Component/Food';
import Hunger from '../Component/Hunger';
import MovementTarget from '../Component/MovementTarget';
import Plant from '../Component/Plant';
import Position from '../Component/Position';
import QuadTree from '../Engine/Type/QuadTree';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';
import config from '../assets/config.json';

export default class PlantFoodTargetAssigner extends System {
    constructor(
        private readonly quadTree: QuadTree<Entity>,
    ) {
        super();
    }

    update(query: Query): void {
        for (const [checkingEntity, hunger, position] of query.allEntities(Hunger, Position, EatsPlants)) {
            if (hunger.hunger > 50) {
                if (!query.hasComponent(checkingEntity, MovementTarget)) {
                    const targetPositions = this
                        .quadTree
                        .queryCircle(new Circle(position.position, 5 * config.tileSize))
                        .map(element => element.data)
                        .filter(entity => this.ecs.query.hasComponents(entity, Plant, Food, Position))
                        .map(entity => this.ecs.query.getComponent(entity, Position))
                    ;
                    if (targetPositions.length > 0) {
                        this.ecs.addComponent(checkingEntity, new MovementTarget(targetPositions[0].position));
                    }
                }
            }
        }
    }
}
