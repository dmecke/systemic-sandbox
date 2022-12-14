import Area from '@dmecke/game-engine/lib/Math/Area';
import Biome from '../Biome/Biome';
import BiomeMap from '../ProceduralGeneration/BiomeMap';
import Rng from '@dmecke/game-engine/lib/Math/Rng';
import Vector from '@dmecke/game-engine/lib/Math/Vector';
import Water from '../Biome/Water';
import config from '../assets/config.json';

export default class Map {
    constructor(
        private readonly biomeMap: BiomeMap,
    ) {
    }

    getRandomLandGridCell(): Vector {
        return this.getRandomLandGridCellInArea(new Area(Vector.null(), new Vector(config.generation.size.x, config.generation.size.y)));
    }

    getRandomLandGridCellInArea(area: Area): Vector {
        let position: Vector;
        let counter = 0;
        do {
            position = new Vector(
                Rng.instance.randomIntBetween(area.left, area.right - 1),
                Rng.instance.randomIntBetween(area.top, area.bottom - 1),
            );
            if (counter++ >= 100) {
                throw new Error(`Infinite loop: Trying to find a no-water tile in area ${area.toString()}.`);
            }
        } while (this.biomeMap.get(position.x, position.y) instanceof Water)

        return position;
    }

    getBiomeAt(position: Vector): Biome {
        return this.biomeMap.get(position.x, position.y);
    }
}
