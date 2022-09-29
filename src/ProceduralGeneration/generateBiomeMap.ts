import BiomeMap from './BiomeMap';
import config from '../assets/config.json';
import factory from '../Biome/Factory';

export default function(heightMap: number[][], moistureMap: number[][]): BiomeMap {
    const size = config.generation.size;
    const map = new BiomeMap();
    for (let y = 0; y < size.y; y++) {
        for (let x = 0; x < size.x; x++) {
            map.set(x, y, factory(heightMap[y][x], moistureMap[y][x]));
        }
    }

    return map;
}
