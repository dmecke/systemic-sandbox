import BiomeRenderer from './Renderer/BiomeRenderer';
import Canvas from '@dmecke/game-engine/lib/Canvas/Canvas';
import Debugging from './Debug/Debugging';
import Game from './Game';
import HeightMapRenderer from './Renderer/HeightMapRenderer';
import ImageLoader from '@dmecke/game-engine/lib/AssetLoader/ImageLoader';
import MoistureMapRenderer from './Renderer/MoistureMapRenderer';
import TileRenderer from './Renderer/TileRenderer';
import TreeMapRenderer from './Renderer/TreeMapRenderer';
import alea from 'alea';
import {createNoise2D} from 'simplex-noise';
import generateBiomeMap from './ProceduralGeneration/generateBiomeMap';
import generateHeightMap from './ProceduralGeneration/generateHeightMap';
import generateMoistureMap from './ProceduralGeneration/generateMoistureMap';
import generateTreeMap from './ProceduralGeneration/generateTreeMap';
import images from './assets/images.json';

const canvasHeight = document.getElementById('canvas_height') as HTMLCanvasElement;
const canvasMoisture = document.getElementById('canvas_moisture') as HTMLCanvasElement;
const canvasTree = document.getElementById('canvas_tree') as HTMLCanvasElement;
const canvasBiomes = document.getElementById('canvas_biomes') as HTMLCanvasElement;
const canvasTiles = document.getElementById('canvas_tiles') as HTMLCanvasElement;
const ctxHeight = canvasHeight.getContext('2d');
const ctxMoisture = canvasMoisture.getContext('2d');
const ctxTree = canvasTree.getContext('2d');
const ctxBiomes = canvasBiomes.getContext('2d');
const ctxTiles = canvasTiles.getContext('2d');
if (ctxHeight === null || ctxMoisture === null || ctxTree === null || ctxBiomes === null || ctxTiles === null) {
    throw new Error('Could not create context 2d.');
}

window.seed = Math.random();
const seeder = alea(window.seed);

const heightMap = generateHeightMap(createNoise2D(seeder));
const moistureMap = generateMoistureMap(createNoise2D(seeder));
const biomeMap = generateBiomeMap(heightMap, moistureMap);
const treeMap = generateTreeMap(createNoise2D(seeder), biomeMap);

new HeightMapRenderer(heightMap, ctxHeight).render();
new MoistureMapRenderer(moistureMap, ctxMoisture).render();
new TreeMapRenderer(treeMap, ctxTree).render();
new BiomeRenderer(biomeMap, ctxBiomes).render();

const tileRenderer = new TileRenderer(heightMap, moistureMap, ctxTiles);

window.canvas = new Canvas('canvas_game', 5);
window.ctx = window.canvas.ctx;
window.debugging = new Debugging();

window.addEventListener('load', () => {
    Promise.all([
        ImageLoader.loadImages(images),
    ]).then(() => {
        tileRenderer.render();
        new Game(biomeMap, treeMap);
    });
});
