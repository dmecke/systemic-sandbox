import Biome from '../Biome/Biome';
import config from '../assets/config.json';
import factory from '../Biome/Factory';

export default function(heightMap: number[][], moistureMap: number[][]): Biome[][] {
    const size = config.generation.size;
    const map = [];
    for (let y = 0; y < size.y; y++) {
        map[y] = [];
        for (let x = 0; x < size.x; x++) {
            map[y][x] = factory(heightMap[y][x], moistureMap[y][x]);
        }
    }

    return map;
}
