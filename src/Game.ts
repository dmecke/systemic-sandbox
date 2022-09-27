import ECS from './Engine/ECS/ECS';
import Fps from './Engine/Debug/Fps';
import GroundLayerComponent from './Component/GroundLayerComponent';
import GroundLayerRenderer from './System/GroundLayerRenderer';
import ImageLoader from './Engine/Assets/ImageLoader';

export default class Game {
    private fps = new Fps();
    private readonly ecs = new ECS();

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

        this.ecs.addSystem(new GroundLayerRenderer());

        const groundLayer = this.ecs.addEntity();
        this.ecs.addComponent(groundLayer, new GroundLayerComponent(heightMap, moistureMap));

        setTimeout(() => { // workaround: wait until image loading is done
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
}
