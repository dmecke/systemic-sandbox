import {createNoise2D} from 'simplex-noise';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
if (ctx === null) {
    throw new Error('Could not create context 2d.');
}

const gen = createNoise2D();
function noise(x: number, y: number): number {
    return gen(x, y) / 2 + 0.5;
}

const map = { width: 320, height: 180 };

enum Biome {
    Water = 0,
    Beach = 1,
    Forest = 2,
    Jungle = 3,
    Savannah = 4,
    Desert = 5,
    Snow = 6,
}

function height(x: number, y: number): number {
    const nx = x / map.width - 0.5;
    const ny = y / map.height - 0.5;
    const frequency = 2.0;
    return noise(frequency * nx, frequency * ny);
}

function moisture(x: number, y: number): number {
    const nx = x / map.width - 0.5;
    const ny = y / map.height - 0.5;
    const frequency = 2.0;
    return noise(nx * frequency, ny * frequency);
}

function biome(elevation: number, moisture: number) {
    if (elevation < 0.1) return Biome.Water;
    if (elevation < 0.12) return Biome.Beach;

    if (elevation > 0.8) {
        if (moisture < 0.1) return Biome.Forest;
        if (moisture < 0.2) return Biome.Savannah;
        if (moisture < 0.5) return Biome.Savannah;
        return Biome.Snow;
    }

    if (elevation > 0.6) {
        if (moisture < 0.33) return Biome.Desert;
        if (moisture < 0.66) return Biome.Savannah;
        return Biome.Savannah;
    }

    if (elevation > 0.3) {
        if (moisture < 0.16) return Biome.Desert;
        if (moisture < 0.50) return Biome.Forest;
        if (moisture < 0.83) return Biome.Forest;
        return Biome.Jungle;
    }

    if (moisture < 0.16) return Biome.Desert;
    if (moisture < 0.33) return Biome.Forest;
    if (moisture < 0.66) return Biome.Forest;
    return Biome.Jungle;
}

function color(biome: Biome): string {
    switch (biome) {
        case Biome.Water:
            return '#4060c0';
        case Biome.Beach:
            return '#eac28a';
        case Biome.Forest:
            return '#88aa55';
        case Biome.Jungle:
            return '#337755';
        case Biome.Savannah:
            return '#6a836a';
        case Biome.Desert:
            return '#eac28a';
        case Biome.Snow:
            return '#ffffff';
        default:
            throw new Error(`Invalid biome: "${biome}".`);
    }
}

const heightmap = [];
for (let y = 0; y < map.height; y++) {
    heightmap[y] = [];
    for (let x = 0; x < map.width; x++) {
        heightmap[y][x] = height(x, y);
    }
}

const moisturemap = [];
for (let y = 0; y < map.height; y++) {
    moisturemap[y] = [];
    for (let x = 0; x < map.width; x++) {
        moisturemap[y][x] = moisture(x, y);
    }
}

for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
        ctx.fillStyle = color(biome(heightmap[y][x], moisturemap[y][x]));
        ctx.fillRect(x, y, 1, 1);
    }
}
