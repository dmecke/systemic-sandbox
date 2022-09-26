import {NoiseFunction2D} from 'simplex-noise';

export default function(map: { width: number, height: number }, noise: NoiseFunction2D): number[][] {
    const heightMap = [];
    for (let y = 0; y < map.height; y++) {
        heightMap[y] = [];
        for (let x = 0; x < map.width; x++) {
            heightMap[y][x] = height(x, y, map, noise);
        }
    }

    return heightMap;
}

function height(x: number, y: number, map: { width: number, height: number, }, noise: NoiseFunction2D): number {
    const nx = x / map.width;
    const ny = y / map.height;
    const frequency = 2.0;

    return noise(frequency * nx, frequency * ny) / 2 + 0.5;
}
