import BiomeRenderer from './BiomeRenderer';
import HeightMapRenderer from './HeightMapRenderer';
import ImageLoader from './Canvas/ImageLoader';
import MoistureMapRenderer from './MoistureMapRenderer';
import TileRenderer from './TileRenderer';
import alea from 'alea';
import {createNoise2D} from 'simplex-noise';
import generateHeightMap from './generateHeightMap';
import generateMoistureMap from './generateMoistureMap';

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

const seeder = alea(Math.random());

const map = { width: 320, height: 180 };

const imageLoader = new ImageLoader();

const heightMap = generateHeightMap(map, createNoise2D(seeder));
const moistureMap = generateMoistureMap(map, createNoise2D(seeder));

new HeightMapRenderer(map, heightMap, ctxHeight).render();
new MoistureMapRenderer(map, moistureMap, ctxMoisture).render();
new BiomeRenderer(map, heightMap, moistureMap, ctxBiomes).render();

const tileRenderer = new TileRenderer(map, heightMap, moistureMap, ctxTiles, imageLoader);
setTimeout(() => tileRenderer.render(), 1000);
