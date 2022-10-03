import Map from '../Map/Map';
import MovementTarget from '../Component/MovementTarget';
import Query from '../Engine/ECS/Query';
import RandomMovement from '../Component/RandomMovement';
import System from '../Engine/ECS/System';
import config from '../assets/config.json';

export default class RandomMovementTargetAssigner extends System {
    constructor(
        private readonly map: Map,
    ) {
        super();
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    componentsRequired = new Set<Function>([RandomMovement]);

    update(query: Query): void {
        for (const [entity] of query.allEntities(RandomMovement)) {
            if (!query.hasComponent(entity, MovementTarget)) {
                this.ecs.addComponent(entity, new MovementTarget(this.map.getRandomLandGridCell().multiply(config.tileSize)));
            }
        }
    }
}
