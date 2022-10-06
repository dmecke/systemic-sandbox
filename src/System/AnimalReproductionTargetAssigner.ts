import Animal from '../Component/Animal';
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

        for (const [entity, gender, position, movementTarget] of animals) {
            const targetEntities = animals
                .filter(([otherEntity]) => entity !== otherEntity)
                .filter(([, otherGender]) => gender !== otherGender)
                .filter(([, , otherPosition]) => position.position.distanceTo(otherPosition.position) <= 5 * config.tileSize)
            ;
            if (targetEntities.length > 0) {
                movementTarget.position = targetEntities[0][2].position;
            }
        }
    }
}
