import {NoiseFunction2D} from 'simplex-noise';
import config from './assets/config.json';

export default function(noise: NoiseFunction2D): number[][] {
    const size = config.generation.size;
    const moistureMap = [];
    for (let y = 0; y < size.y; y++) {
        moistureMap[y] = [];
        for (let x = 0; x < size.x; x++) {
            moistureMap[y][x] = moisture(x, y, noise);
        }
    }

    return moistureMap;
}

function moisture(x: number, y: number, noise: NoiseFunction2D): number {
    const size = config.generation.size;
    const nx = x / size.x;
    const ny = y / size.y;
    const frequency = 2.0;

    return noise(nx * frequency, ny * frequency) / 2 + 0.5;
}
