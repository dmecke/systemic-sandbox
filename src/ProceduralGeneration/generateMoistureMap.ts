import {NoiseFunction2D} from 'simplex-noise';
import config from '../assets/config.json';

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
    const nx = x / size.x - 0.5;
    const ny = y / size.y - 0.5;

    let moisture = 0;

    moisture += 1.00 * n(noise, 1 * nx, 1 * ny);
    moisture += 0.50 * n(noise, 2 * nx, 2 * ny);
    moisture += 0.25 * n(noise, 4 * nx, 4 * ny);
    moisture += 0.13 * n(noise, 8 * nx, 8 * ny);
    moisture += 0.06 * n(noise, 16 * nx, 16 * ny);
    moisture += 0.03 * n(noise, 32 * nx, 32 * ny);

    moisture = moisture / (1.00 + 0.50 + 0.25 + 0.13 + 0.06 + 0.03);
    moisture = Math.pow(moisture, 2.00);

    return moisture * 1.8;
}

function n(noise, nx, ny) {
    return noise(nx, ny) / 2 + 0.5;
}
