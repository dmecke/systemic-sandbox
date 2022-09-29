import BiomeMap from './BiomeMap';
import {NoiseFunction2D} from 'simplex-noise';
import TreeMap from './TreeMap';
import config from '../assets/config.json';

export default function(noise: NoiseFunction2D, biomeMap: BiomeMap): TreeMap {
    const size = config.generation.size;
    const map = [];
    for (let y = 0; y < size.y; y++) {
        map[y] = [];
        for (let x = 0; x < size.x; x++) {
            map[y][x] = bluenoise(x, y, noise);
        }
    }

    const trees = new TreeMap();
    for (let yc = 0; yc < size.y; yc++) {
        for (let xc = 0; xc < size.x; xc++) {
            let max = 0;
            const biome = biomeMap.get(xc, yc);
            const r = biome.treeR;
            if (r > 0) {
                for (let yn = yc - r; yn <= yc + r; yn++) {
                    for (let xn = xc - r; xn <= xc + r; xn++) {
                        if (0 <= yn && yn < size.y && 0 <= xn && xn < size.x) {
                            const e = map[yn][xn];
                            if (e > max) {
                                max = e;
                            }
                        }
                    }
                }
            }
            if (map[yc][xc] === max) {
                trees.add(xc, yc);
            }
        }
    }

    return trees;
}

function bluenoise(x: number, y: number, noise: NoiseFunction2D): number {
    const size = config.generation.size;
    const nx = x / size.x - 0.5;
    const ny = y / size.y - 0.5;

    return n(noise, 50 * nx, 50 * ny);
}

function n(noise, nx, ny) {
    return noise(nx, ny) / 2 + 0.5;
}
