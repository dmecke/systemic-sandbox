import CameraPositionUpdater from './System/CameraPositionUpdater';
import ECS from './Engine/ECS/ECS';
import Entity from './Engine/ECS/Entity';
import EntityFactory from './Engine/ECS/EntityFactory';
import Fps from './Engine/Debug/Fps';
import GroundLayerComponent from './Component/GroundLayerComponent';
import GroundLayerRenderer from './System/GroundLayerRenderer';
import ImageLoader from './Engine/Assets/ImageLoader';
import config from './assets/config.json';
import entityFactoryMap from './Entity/entityFactoryMap';
import entityMap from './Entity/entityMap';
import factory from './Biome/Factory';

export default class Game {
    private fps = new Fps();
    private readonly ecs = new ECS();
    private readonly entityFactory = new EntityFactory(this.ecs, entityMap, entityFactoryMap);
    private camera: Entity;

    constructor(
        private readonly heightMap: number[][],
        private readonly moistureMap: number[][],
    ) {
        const images = [
            'tiles/desert',
            'tiles/grassland',
            'tiles/jungle',
            'tiles/swamp',
            'tiles/water',
            'tiles/snow',
        ];
        ImageLoader.loadImages(images);

        setTimeout(() => { // workaround: wait until image loading is done
            this.ecs.addSystem(new CameraPositionUpdater());
            this.ecs.addSystem(new GroundLayerRenderer());

            this.camera = this.entityFactory.create('camera');

            const groundLayer = this.ecs.addEntity();
            this.ecs.addComponent(groundLayer, this.createGroundLayerComponent());

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
        const offsets = [];
        for (let y = 0; y < size.y; y++) {
            offsets[y] = [];
            for (let x = 0; x < size.x; x++) {
                const biome = factory(this.heightMap[y][x], this.moistureMap[y][x]);
                const img = ImageLoader.instance.getImage(`tiles/${biome.image}`);
                offsets[y][x] = Math.floor(Math.random() * (img.width as number) / config.tileSize);
            }
        }

        return new GroundLayerComponent(this.heightMap, this.moistureMap, offsets, this.camera);
    }
}
