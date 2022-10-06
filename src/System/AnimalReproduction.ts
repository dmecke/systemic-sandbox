import Animal from '../Component/Animal';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import ReproductionUrge from '../Component/ReproductionUrge';
import System from '../Engine/ECS/System';
import Vector from '../Engine/Math/Vector';

export default class AnimalReproduction extends System {
    constructor(
        private readonly animal: string,
        private readonly entityFactory: { create(position: Vector) },
    ) {
        super();
    }

    update(query: Query): void {
        const animals = query
            .allComponents(ReproductionUrge, Position, Animal)
            .filter(([, , animal]) => animal.type === this.animal)
            .filter(([urge]) => urge.urge >= 50)
        ;

        for (let i = 0; i < animals.length; i++) {
            for (let j = i + 1; j < animals.length; j++) {
                if (animals[i][1].position.distanceTo(animals[j][1].position) <= 1) {
                    animals[i][0].urge = 0;
                    animals[j][0].urge = 0;
                    this.entityFactory.create(animals[i][1].position);
                }
            }
        }
    }
}
