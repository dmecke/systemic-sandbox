import AddIsInViewport from './System/AddIsInViewport';
import BiomeComponent from './Component/BiomeComponent';
import BiomeMap from './ProceduralGeneration/BiomeMap';
import CameraFocusUpdater from './System/CameraFocusUpdater';
import CameraPositionUpdater from './System/CameraPositionUpdater';
import ECS from './Engine/ECS/ECS';
import Entity from './Engine/ECS/Entity';
import EntityFactory from './Engine/ECS/EntityFactory';
import Fps from './Engine/Debug/Fps';
import GroundLayerRenderer from './System/GroundLayerRenderer';
import ImageLoader from './Engine/Assets/ImageLoader';
import InputEvaluator from './System/InputEvaluator';
import NumberMap from './ProceduralGeneration/NumberMap';
import Position from './Component/Position';
import RemoveIsInViewport from './System/RemoveIsInViewport';
import RestoreCanvasContext from './System/RestoreCanvasContext';
import Sprite from './Component/Sprite';
import SpriteRenderer from './System/SpriteRenderer';
import TranslateCanvasContext from './System/TranslateCanvasContext';
import TreeMap from './ProceduralGeneration/TreeMap';
import UpdateZIndex from './System/UpdateZIndex';
import Vector from './Engine/Math/Vector';
import config from './assets/config.json';
import entityFactoryMap from './Entity/entityFactoryMap';
import entityMap from './Entity/entityMap';

export default class Game {
    private fps = new Fps();
    private readonly ecs = new ECS();
    private readonly entityFactory = new EntityFactory(this.ecs, entityMap, entityFactoryMap);
    private camera: Entity;

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

            this.ecs.addSystem(new RemoveIsInViewport());
            this.ecs.addSystem(new AddIsInViewport());
            this.ecs.addSystem(new UpdateZIndex()); // after update is in viewport

            this.ecs.addSystem(new TranslateCanvasContext()); // after camera updates; before renderings

            this.ecs.addSystem(new GroundLayerRenderer());
            this.ecs.addSystem(new SpriteRenderer());
            this.ecs.addSystem(new RestoreCanvasContext());

            this.camera = this.entityFactory.create('camera');
            this.entityFactory.create('player');

            const ground = this.ecs.addEntity();
            this.ecs.addComponent(ground, this.createGroundLayerComponent());

            this.treeMap.all().forEach(position => this.createTreeAt(position));

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

    private createGroundLayerComponent(): BiomeComponent {
        const size = config.generation.size;
        const spriteOffsets = new NumberMap();
        for (let y = 0; y < size.y; y++) {
            for (let x = 0; x < size.x; x++) {
                const biome = this.biomeMap.get(x, y);
                const img = ImageLoader.instance.getImage(`tiles/${biome.image}`);
                spriteOffsets.set(x, y, Math.floor(Math.random() * (img.width as number) / config.tileSize));
            }
        }

        return new BiomeComponent(this.biomeMap, spriteOffsets);
    }

    private createTreeAt(position: Vector): void {
        const tree = this.entityFactory.create('tree');
        this.ecs.getComponents(tree).get(Position).position = position.multiply(config.tileSize);
        const biome = this.biomeMap.get(position.x, position.y);
        const imageName = `props/tree_${biome.image}`;
        const img = ImageLoader.instance.getImage(imageName);
        this.ecs.addComponent(tree, new Sprite(imageName, new Vector(img.width / 2, img.height), new Vector(img.width, img.height), new Vector(0, 0), 1));
    }
}
