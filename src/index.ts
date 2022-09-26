import alea from 'alea';
import {createNoise2D} from 'simplex-noise';

const canvasHeight = document.getElementById('canvas_height') as HTMLCanvasElement;
const canvasMoisture = document.getElementById('canvas_moisture') as HTMLCanvasElement;
const canvasBiomes = document.getElementById('canvas_biomes') as HTMLCanvasElement;
const canvasTiles = document.getElementById('canvas_tiles') as HTMLCanvasElement;
const ctxHeight = canvasHeight.getContext('2d');
const ctxMoisture = canvasMoisture.getContext('2d');
const ctxBiomes = canvasBiomes.getContext('2d');
const ctxTiles = canvasTiles.getContext('2d');
if (ctxHeight === null || ctxMoisture === null || ctxBiomes === null || ctxTiles === null) {
    throw new Error('Could not create context 2d.');
}

const seed = Math.random();
const a = alea(seed);

const genHeight = createNoise2D(a);
const genMoisture = createNoise2D(a);

const map = { width: 320, height: 180 };

enum Biome {
    Water = 0,
    Desert = 1,
    Grassland = 2,
    Jungle = 3,
    Swamp = 4,
    Snow = 5,
}

const seaLevel = 0.2;
const swampLevel = 0.3;

function height(x: number, y: number): number {
    const nx = x / map.width;
    const ny = y / map.height;
    const frequency = 2.0;
    return genHeight(frequency * nx, frequency * ny) / 2 + 0.5;
}

function moisture(x: number, y: number): number {
    const nx = x / map.width;
    const ny = y / map.height;
    const frequency = 2.0;
    return genMoisture(nx * frequency, ny * frequency) / 2 + 0.5;
}

function biome(elevation: number, moisture: number) {
    if (elevation <= seaLevel) return Biome.Water;

    if (elevation <= swampLevel && moisture > 0.75) {
        return Biome.Swamp;
    }

    if (moisture <= 0.25) return Biome.Desert;
    if (moisture >= 0.75) return Biome.Jungle;

    return Biome.Grassland;
}

function color(biome: Biome): string {
    switch (biome) {
        case Biome.Water:
            return '#4060c0';
        case Biome.Desert:
            return '#eac28a';
        case Biome.Grassland:
            return '#88aa55';
        case Biome.Jungle:
            return '#337755';
        case Biome.Swamp:
            return '#6a836a';
        case Biome.Snow:
            return '#ffffff';
        default:
            throw new Error(`Invalid biome: "${biome}".`);
    }
}

const images: Record<string, HTMLImageElement> = {};
const files = [
    'desert',
    'grassland',
    'jungle',
    'swamp',
    'water',
    'snow',
];

// const imageImports = [];
for (let i = 0; i < files.length; i++) {
    images[files[i]] = new Image();
    // const imp = import('./assets/tiles/' + files[i] + '.png');
    // imageImports.push(imp);
    import('./assets/tiles/' + files[i] + '.png').then(image => images[files[i]].src = image.default);
}
// Promise.all(imageImports).then(() => {
//     console.log(imageImports.length);
//     console.log('draw');
//     drawTiles();
// });

function image(biome: Biome): CanvasImageSource {
    switch (biome) {
        case Biome.Water:
            return images.water;
        case Biome.Desert:
            return images.desert;
        case Biome.Grassland:
            return images.grassland;
        case Biome.Jungle:
            return images.jungle;
        case Biome.Swamp:
            return images.swamp;
        case Biome.Snow:
            return images.snow;
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
        const gray = heightmap[y][x] * 255;
        ctxHeight.fillStyle = `rgb(${gray}, ${gray}, ${gray})`;
        ctxHeight.fillRect(x, y, 1, 1);
    }
}

for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
        ctxMoisture.fillStyle = `rgba(0, 0, 255, ${moisturemap[y][x]})`;
        ctxMoisture.fillRect(x, y, 1, 1);
    }
}

for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
        ctxBiomes.fillStyle = color(biome(heightmap[y][x], moisturemap[y][x]));
        ctxBiomes.fillRect(x, y, 1, 1);
    }
}

setTimeout(() => {
    for (let y = 0; y < map.height; y++) {
        for (let x = 0; x < map.width; x++) {
            const b = biome(heightmap[y][x], moisturemap[y][x]);
            const img = image(b);
            ctxTiles.drawImage(
                img,
                Math.floor(Math.random() * (img.width as number) / 8) * 8,
                0,
                8,
                8,
                x * 8,
                y * 8,
                8,
                8,
            );
        }
    }
}, 1000);
