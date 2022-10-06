import Gender from '../Component/Gender';
import MovementTarget from '../Component/MovementTarget';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import ReproductionUrge from '../Component/ReproductionUrge';
import Sheep from '../Component/Sheep';
import System from '../Engine/ECS/System';
import config from '../assets/config.json';

export default class SheepReproductionTargetAssigner extends System {
    update(query: Query): void {
        const sheep = query
            .allEntities(Gender, Position, MovementTarget, ReproductionUrge, Sheep)
            .filter(([, , , , urge]) => urge.urge >= 50)
        ;

        for (const [entity, gender, position, movementTarget] of sheep) {
            const targetEntities = sheep
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
