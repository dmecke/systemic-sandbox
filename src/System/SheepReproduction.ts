import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import ReproductionUrge from '../Component/ReproductionUrge';
import Sheep from '../Component/Sheep';
import SheepFactory from '../Entity/Factory/SheepFactory';
import System from '../Engine/ECS/System';

export default class SheepReproduction extends System {
    constructor(
        private readonly sheepFactory: SheepFactory,
    ) {
        super();
    }

    update(query: Query): void {
        const sheep = query
            .allComponents(ReproductionUrge, Position, Sheep)
            .filter(([urge]) => urge.urge >= 50)
        ;

        for (let i = 0; i < sheep.length; i++) {
            for (let j = i + 1; j < sheep.length; j++) {
                if (sheep[i][1].position.distanceTo(sheep[j][1].position) <= 1) {
                    sheep[i][0].urge = 0;
                    sheep[j][0].urge = 0;
                    this.sheepFactory.create(sheep[i][1].position);
                }
            }
        }
    }
}
