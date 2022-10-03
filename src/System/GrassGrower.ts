import BiomeComponent from '../Component/BiomeComponent';
import Flammable from '../Component/Flammable';
import Food from '../Component/Food';
import Health from '../Component/Health';
import Interactable from '../Component/Interactable';
import Map from '../Map/Map';
import Plant from '../Component/Plant';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import Rng from '../Engine/Math/Rng';
import Sprite from '../Component/Sprite';
import System from '../Engine/ECS/System';
import Vector from '../Engine/Math/Vector';
import config from '../assets/config.json';

export default class GrassGrower extends System {
    constructor(
        private readonly map: Map,
    ) {
        super();
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    componentsRequired = new Set<Function>([BiomeComponent]);

    update(query: Query): void {
        query.oneComponent(BiomeComponent);
        const grass = query.allComponents(Position, Plant);

        for (let i = 0; i < config.systems.grassGrowRate; i++) {
            const targetPosition = this.map.getRandomLandGridCell();
            const biome = this.map.getBiomeAt(targetPosition);
            if (Rng.getInstance(window.seed.toString()).chance(biome.grassChance)) {
                if (grass.filter(([position]) => position.position.divide(config.tileSize).distanceTo(targetPosition) < 2).length === 0) {
                    const plant = this.ecs.addEntity();
                    this.ecs.addComponent(plant, new Position(targetPosition.multiply(config.tileSize)));
                    this.ecs.addComponent(plant, new Sprite('props/grass', new Vector(4, 7), new Vector(8, 8), new Vector(0, 0), 1));
                    this.ecs.addComponent(plant, new Flammable(100));
                    this.ecs.addComponent(plant, new Health(50));
                    this.ecs.addComponent(plant, new Interactable());
                    this.ecs.addComponent(plant, new Plant());
                    this.ecs.addComponent(plant, new Food());
                }
            }
        }
    }
}
