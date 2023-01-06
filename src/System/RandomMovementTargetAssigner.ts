import Area from '@dmecke/game-engine/lib/Math/Area';
import Map from '../Map/Map';
import MovementTarget from '../Component/MovementTarget';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import RandomMovement from '../Component/RandomMovement';
import Rng from '@dmecke/game-engine/lib/Math/Rng';
import System from '../Engine/ECS/System';
import config from '../assets/config.json';

export default class RandomMovementTargetAssigner extends System {
    constructor(
        private readonly map: Map,
    ) {
        super();
    }

    update(query: Query): void {
        for (const [entity, position, randomMovement] of query.allEntities(Position, RandomMovement)) {
            if (!query.hasComponent(entity, MovementTarget)) {
                if (Rng.instance.chance(10)) {
                    const area = Area.around(position.position.divide(config.tileSize).round(), randomMovement.range);
                    this.ecs.addComponent(entity, new MovementTarget(this.map.getRandomLandGridCellInArea(area).multiply(config.tileSize)));
                }
            }
        }
    }
}
