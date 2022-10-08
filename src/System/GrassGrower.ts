import BiomeComponent from '../Component/BiomeComponent';
import GrassFactory from '../Entity/Factory/GrassFactory';
import Map from '../Map/Map';
import Plant from '../Component/Plant';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import Rng from '../Engine/Math/Rng';
import System from '../Engine/ECS/System';
import config from '../assets/config.json';

export default class GrassGrower extends System {
    constructor(
        private readonly map: Map,
        private readonly grassFactory: GrassFactory,
    ) {
        super();
    }

    update(query: Query): void {
        query.oneComponent(BiomeComponent);
        const grass = query.allComponents(Position, Plant);

        for (let i = 0; i < config.systems.grassGrowRate; i++) {
            const targetPosition = this.map.getRandomLandGridCell();
            const biome = this.map.getBiomeAt(targetPosition);
            if (Rng.getInstance(window.seed.toString()).chance(biome.grassChance)) {
                if (grass.filter(([position]) => position.position.divide(config.tileSize).distanceTo(targetPosition) < 2).length === 0) {
                    this.grassFactory.create(targetPosition.multiply(config.tileSize));
                }
            }
        }
    }
}
