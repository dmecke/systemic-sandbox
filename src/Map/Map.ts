import BiomeMap from '../ProceduralGeneration/BiomeMap';
import Rng from '../Engine/Math/Rng';
import Vector from '../Engine/Math/Vector';
import Water from '../Biome/Water';
import config from '../assets/config.json';

export default class Map {
    constructor(
        private readonly biomeMap: BiomeMap,
    ) {
    }

    getRandomLandPosition(): Vector {
        const rng = Rng.getInstance(window.seed.toString());
        let position: Vector;
        do {
            position = new Vector(
                rng.random(config.generation.size.x),
                rng.random(config.generation.size.y),
            );
        } while (this.biomeMap.get(position.x, position.y) instanceof Water)

        return position.multiply(config.tileSize);
    }
}
