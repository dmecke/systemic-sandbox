import BiomeMap from './ProceduralGeneration/BiomeMap';
import Canvas from '@dmecke/game-engine/lib/Canvas/Canvas';
import Debugging from './Debug/Debugging';
import Game from './Game';
import ImageLoader from '@dmecke/game-engine/lib/AssetLoader/ImageLoader';
import TileRenderer from './Renderer/TileRenderer';
import TreeMap from './ProceduralGeneration/TreeMap';
import images from './assets/images.json';

export default class Application {
    constructor(
        tileRenderer: TileRenderer,
        biomeMap: BiomeMap,
        treeMap: TreeMap,
    ) {
        window.canvas = new Canvas('canvas_game', 5);
        window.ctx = window.canvas.ctx;
        window.debugging = new Debugging();

        window.addEventListener('load', () => {
            Promise.all([
                ImageLoader.loadImages(images),
            ]).then(() => {
                tileRenderer.render();
                window.game = new Game(biomeMap, treeMap);
            });
        });
    }
}
