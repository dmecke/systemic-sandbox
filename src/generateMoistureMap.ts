import {NoiseFunction2D} from 'simplex-noise';

export default function(map: { width: number, height: number }, noise: NoiseFunction2D): number[][] {
    const moistureMap = [];
    for (let y = 0; y < map.height; y++) {
        moistureMap[y] = [];
        for (let x = 0; x < map.width; x++) {
            moistureMap[y][x] = moisture(x, y, map, noise);
        }
    }

    return moistureMap;
}

function moisture(x: number, y: number, map: { width: number, height: number }, noise: NoiseFunction2D): number {
    const nx = x / map.width;
    const ny = y / map.height;
    const frequency = 2.0;

    return noise(nx * frequency, ny * frequency) / 2 + 0.5;
}
