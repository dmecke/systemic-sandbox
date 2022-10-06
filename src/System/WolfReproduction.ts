import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import ReproductionUrge from '../Component/ReproductionUrge';
import System from '../Engine/ECS/System';
import Wolf from '../Component/Wolf';
import WolfFactory from '../Entity/Factory/WolfFactory';

export default class WolfReproduction extends System {
    constructor(
        private readonly wolfFactory: WolfFactory,
    ) {
        super();
    }

    update(query: Query): void {
        const wolves = query
            .allComponents(ReproductionUrge, Position, Wolf)
            .filter(([urge]) => urge.urge >= 50)
        ;

        for (let i = 0; i < wolves.length; i++) {
            for (let j = i + 1; j < wolves.length; j++) {
                if (wolves[i][1].position.distanceTo(wolves[j][1].position) <= 1) {
                    wolves[i][0].urge = 0;
                    wolves[j][0].urge = 0;
                    this.wolfFactory.create(wolves[i][1].position);
                }
            }
        }
    }
}
