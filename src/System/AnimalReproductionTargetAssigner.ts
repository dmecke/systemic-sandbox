import Animal from '../Component/Animal';
import Circle from '../Engine/Math/Circle';
import Gender from '../Component/Gender';
import MovementTarget from '../Component/MovementTarget';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import ReproductionUrge from '../Component/ReproductionUrge';
import System from '../Engine/ECS/System';
import config from '../assets/config.json';

export default class AnimalReproductionTargetAssigner extends System {
    constructor(
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

        for (const [checkingEntity, checkingGender, position, movementTarget] of animals) {
            const targets = this
                .ecs
                .query
                .allEntitiesAt(new Circle(position.position, 5 * config.tileSize), Gender, Position)
                .filter(([entity]) => entity !== checkingEntity)
                .filter(([, gender]) => !(gender as Gender).equals(checkingGender))
            ;
            if (targets.length > 0) {
                movementTarget.position = (targets[0][2] as Position).position;
            }
        }
    }
}
