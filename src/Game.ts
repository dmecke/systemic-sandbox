import BiomeMap from './ProceduralGeneration/BiomeMap';
import CameraFocusUpdater from './System/CameraFocusUpdater';
import CameraPositionUpdater from './System/CameraPositionUpdater';
import ECS from './Engine/ECS/ECS';
import EntityFactory from './Engine/ECS/EntityFactory';
import Fps from './Engine/Debug/Fps';
import GroundLayerComponent from './Component/GroundLayerComponent';
import GroundLayerRenderer from './System/GroundLayerRenderer';
import ImageLoader from './Engine/Assets/ImageLoader';
import InputEvaluator from './System/InputEvaluator';
import NumberMap from './ProceduralGeneration/NumberMap';
import Renderable from './Component/Renderable';
import RestoreCanvasContext from './System/RestoreCanvasContext';
import SpriteRenderer from './System/SpriteRenderer';
import TranslateCanvasContext from './System/TranslateCanvasContext';
import TreeLayerComponent from './Component/TreeLayerComponent';
import TreeLayerRenderer from './System/TreeLayerRenderer';
import TreeMap from './ProceduralGeneration/TreeMap';
import config from './assets/config.json';
import entityFactoryMap from './Entity/entityFactoryMap';
import entityMap from './Entity/entityMap';

export default class Game {
    private fps = new Fps();
    private readonly ecs = new ECS();
    private readonly entityFactory = new EntityFactory(this.ecs, entityMap, entityFactoryMap);

    constructor(
        private readonly biomeMap: BiomeMap,
        private readonly treeMap: TreeMap,
    ) {
        const images = [
            'tiles/desert',
            'tiles/grassland',
            'tiles/jungle',
            'tiles/swamp',
            'tiles/water',
            'tiles/snow',
            'props/tree_desert',
            'props/tree_grassland',
            'props/tree_jungle',
            'props/tree_swamp',
            'props/tree_snow',
            'characters/player',
        ];
        ImageLoader.loadImages(images);

        setTimeout(() => { // workaround: wait until image loading is done
            this.ecs.addSystem(new CameraFocusUpdater());
            this.ecs.addSystem(new CameraPositionUpdater());
            this.ecs.addSystem(new InputEvaluator());

            this.ecs.addSystem(new TranslateCanvasContext()); // after camera updates; before renderings

            this.ecs.addSystem(new GroundLayerRenderer());
            this.ecs.addSystem(new TreeLayerRenderer());
            this.ecs.addSystem(new SpriteRenderer());
            this.ecs.addSystem(new RestoreCanvasContext());

            const camera = this.entityFactory.create('camera');

            const player = this.entityFactory.create('player');
            this.ecs.addComponent(player, new Renderable(camera));

            const ground = this.ecs.addEntity();
            this.ecs.addComponent(ground, this.createGroundLayerComponent());
            this.ecs.addComponent(ground, new TreeLayerComponent(this.biomeMap, this.treeMap));
            this.ecs.addComponent(ground, new Renderable(camera));

            requestAnimationFrame(() => this.update());
        }, 500);
    }

    update(): void {
        if (window.debugging.showFps) {
            this.fps.tick();
        }

        if (window.debugging.showFps) {
            document.getElementById('fps').innerText = `${this.fps.fps.toString()} fps`;
        }

        this.ecs.update();

        requestAnimationFrame(() => this.update());
    }

    private createGroundLayerComponent(): GroundLayerComponent {
        const size = config.generation.size;
        const sprites = new NumberMap();
        for (let y = 0; y < size.y; y++) {
            for (let x = 0; x < size.x; x++) {
                const biome = this.biomeMap.get(x, y);
                const img = ImageLoader.instance.getImage(`tiles/${biome.image}`);
                sprites.set(x, y, Math.floor(Math.random() * (img.width as number) / config.tileSize));
            }
        }

        return new GroundLayerComponent(this.biomeMap, sprites);
    }
}
