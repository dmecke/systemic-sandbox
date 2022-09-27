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
    const nx = x / map.width - 0.5;
    const ny = y / map.height - 0.5;

    let elevation = 0;

    elevation += 1.00 * n(noise, 1 * nx, 1 * ny);
    elevation += 0.50 * n(noise, 2 * nx, 2 * ny);
    elevation += 0.25 * n(noise, 4 * nx, 4 * ny);
    elevation += 0.13 * n(noise, 8 * nx, 8 * ny);
    elevation += 0.06 * n(noise, 16 * nx, 16 * ny);
    elevation += 0.03 * n(noise, 32 * nx, 32 * ny);

    elevation = elevation / (1.00 + 0.50 + 0.25 + 0.13 + 0.06 + 0.03);
    elevation = Math.pow(elevation, 2.00);

    return elevation;
}

function n(noise, nx, ny) {
    return noise(nx, ny) / 2 + 0.5;
}
