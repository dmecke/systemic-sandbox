import Map from '../Map/Map';
import MovementTarget from '../Component/MovementTarget';
import Query from '../Engine/ECS/Query';
import RandomMovement from '../Component/RandomMovement';
import Rng from '../Engine/Math/Rng';
import System from '../Engine/ECS/System';
import config from '../assets/config.json';

export default class RandomMovementTargetAssigner extends System {
    constructor(
        private readonly map: Map,
    ) {
        super();
    }

    update(query: Query): void {
        for (const [entity] of query.allEntities(RandomMovement)) {
            if (!query.hasComponent(entity, MovementTarget)) {
                if (Rng.getInstance(window.seed.toString()).chance(10)) {
                    this.ecs.addComponent(entity, new MovementTarget(this.map.getRandomLandGridCell().multiply(config.tileSize)));
                }
            }
        }
    }
}
