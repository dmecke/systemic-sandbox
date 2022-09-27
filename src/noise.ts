import {NoiseFunction2D} from 'simplex-noise/simplex-noise';

export default function (noise: NoiseFunction2D, x: number, y: number): number {
    return noise(x, y);
}
