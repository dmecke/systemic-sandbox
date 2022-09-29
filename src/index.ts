import BiomeRenderer from './BiomeRenderer';
import Canvas from './Engine/Canvas/Canvas';
import Debugging from './Debug/Debugging';
import Game from './Game';
import HeightMapRenderer from './HeightMapRenderer';
import MoistureMapRenderer from './MoistureMapRenderer';
import TileRenderer from './TileRenderer';
import TreeMapRenderer from './TreeMapRenderer';
import alea from 'alea';
import {createNoise2D} from 'simplex-noise';
import generateBiomeMap from './generateBiomeMap';
import generateHeightMap from './generateHeightMap';
import generateMoistureMap from './generateMoistureMap';
import generateTreeMap from './generateTreeMap';

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

const seeder = alea(Math.random());

const heightMap = generateHeightMap(createNoise2D(seeder));
const moistureMap = generateMoistureMap(createNoise2D(seeder));
const biomeMap = generateBiomeMap(heightMap, moistureMap);
const treeMap = generateTreeMap(createNoise2D(seeder), biomeMap);

new HeightMapRenderer(heightMap, ctxHeight).render();
new MoistureMapRenderer(moistureMap, ctxMoisture).render();
new TreeMapRenderer(treeMap, ctxTree).render();
new BiomeRenderer(biomeMap, ctxBiomes).render();

const tileRenderer = new TileRenderer(heightMap, moistureMap, ctxTiles);
setTimeout(() => tileRenderer.render(), 500);




new Canvas('canvas_game');

window.debugging = new Debugging();

window.canvas = document.getElementById('canvas_game') as HTMLCanvasElement;
const ctx = window.canvas.getContext('2d');
if (ctx === null) {
    throw new Error('Could not create context 2d.');
}
window.ctx = ctx;

window.addEventListener('load', () => new Game(heightMap, moistureMap));
