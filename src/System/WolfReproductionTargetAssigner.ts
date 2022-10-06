import Gender from '../Component/Gender';
import MovementTarget from '../Component/MovementTarget';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import ReproductionUrge from '../Component/ReproductionUrge';
import System from '../Engine/ECS/System';
import Wolf from '../Component/Wolf';
import config from '../assets/config.json';

export default class WolfReproductionTargetAssigner extends System {
    update(query: Query): void {
        const wolves = query
            .allEntities(Gender, Position, MovementTarget, ReproductionUrge, Wolf)
            .filter(([, , , , urge]) => urge.urge >= 50)
        ;

        for (const [entity, gender, position, movementTarget] of wolves) {
            const targetEntities = wolves
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
