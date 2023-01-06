import Animal from '../Component/Animal';
import Gender from '../Component/Gender';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import ReproductionUrge from '../Component/ReproductionUrge';
import System from '../Engine/ECS/System';
import Vector from '@dmecke/game-engine/lib/Math/Vector';

export default class AnimalReproduction extends System {
    constructor(
        private readonly entityFactory: { create(position: Vector) },
        private readonly animal: string,
    ) {
        super();
    }

    update(query: Query): void {
        const animals = query
            .allComponents(ReproductionUrge, Position, Animal, Gender)
            .filter(([, , animal]) => animal.type === this.animal)
            .filter(([urge]) => urge.urge >= 50)
        ;

        const maleAnimals = animals.filter(([, , , gender]) => gender.gender === 'male');
        const femaleAnimals = animals.filter(([, , , gender]) => gender.gender === 'female');

        for (let i = 0; i < maleAnimals.length; i++) {
            for (let j = 0; j < femaleAnimals.length; j++) {
                if (!maleAnimals[i][3].equals(femaleAnimals[j][3]) && maleAnimals[i][1].position.distanceTo(femaleAnimals[j][1].position) <= 1) {
                    maleAnimals[i][0].urge = 0;
                    femaleAnimals[j][0].urge = 0;
                    this.entityFactory.create(maleAnimals[i][1].position);
                }
            }
        }
    }
}
