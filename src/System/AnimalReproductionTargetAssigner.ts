import Animal from '../Component/Animal';
import Circle from '../Engine/Math/Circle';
import Entity from '../Engine/ECS/Entity';
import Gender from '../Component/Gender';
import MovementTarget from '../Component/MovementTarget';
import Position from '../Component/Position';
import QuadTree from '../Engine/Type/QuadTree';
import Query from '../Engine/ECS/Query';
import ReproductionUrge from '../Component/ReproductionUrge';
import System from '../Engine/ECS/System';
import config from '../assets/config.json';

export default class AnimalReproductionTargetAssigner extends System {
    constructor(
        private readonly quadTree: QuadTree<Entity>,
        private readonly animal: string,
    ) {
        super();
    }

    update(query: Query): void {
        const animals = query
            .allEntities(Gender, Position, MovementTarget, ReproductionUrge, Animal)
            .filter(([, , , , , animal]) => animal.type === this.animal)
            .filter(([, , , , urge]) => urge.urge >= 50)
        ;

        for (const [checkingEntity, gender, position, movementTarget] of animals) {
            const targetPositions = this
                .quadTree
                .queryCircle(new Circle(position.position, 5 * config.tileSize))
                .map(element => element.data)
                .filter(entity => entity !== checkingEntity)
                .filter(entity => this.ecs.query.hasComponent(entity, Gender))
                .filter(entity => !this.ecs.query.getComponent(entity, Gender).equals(gender))
                .map(entity => this.ecs.query.getComponent(entity, Position))
            ;
            if (targetPositions.length > 0) {
                movementTarget.position = targetPositions[0].position;
            }
        }
    }
}
