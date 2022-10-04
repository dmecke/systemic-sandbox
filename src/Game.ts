import AddIsInViewport from './System/AddIsInViewport';
import AdjustDirection from './System/AdjustDirection';
import Animator from './System/Animator';
import ApplyFireDamage from './System/ApplyFireDamage';
import ApplyHungerDamage from './System/ApplyHungerDamage';
import BiomeComponent from './Component/BiomeComponent';
import BiomeMap from './ProceduralGeneration/BiomeMap';
import CameraComponent from './Component/CameraComponent';
import CameraFocusUpdater from './System/CameraFocusUpdater';
import CameraPositionUpdater from './System/CameraPositionUpdater';
import DisplayStatistics from './System/DisplayStatistics';
import ECS from './Engine/ECS/ECS';
import EatMeat from './System/EatMeat';
import EatPlant from './System/EatPlant';
import Entity from './Engine/ECS/Entity';
import EntityFactory from './Engine/ECS/EntityFactory';
import FireRenderer from './System/FireRenderer';
import Fps from './Engine/Debug/Fps';
import GrassGrower from './System/GrassGrower';
import GroundLayerRenderer from './System/GroundLayerRenderer';
import ImageLoader from './Engine/Assets/ImageLoader';
import IncreaseHunger from './System/IncreaseHunger';
import Input from './Input/Input';
import Interactable from './Component/Interactable';
import Map from './Map/Map';
import MeatFoodTargetAssigner from './System/MeatFoodTargetAssigner';
import MoveToMovementTarget from './System/MoveToMovementTarget';
import MovementAnimationUpdater from './System/MovementAnimationUpdater';
import MovementTarget from './Component/MovementTarget';
import MovementTargetRemover from './System/MovementTargetRemover';
import NumberMap from './ProceduralGeneration/NumberMap';
import OnFire from './Component/OnFire';
import PlantFoodTargetAssigner from './System/PlantFoodTargetAssigner';
import Position from './Component/Position';
import RandomMovementTargetAssigner from './System/RandomMovementTargetAssigner';
import RemoveIsInViewport from './System/RemoveIsInViewport';
import RemoveWithoutHealth from './System/RemoveWithoutHealth';
import RestoreCanvasContext from './System/RestoreCanvasContext';
import SpreadFire from './System/SpreadFire';
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
    private readonly map: Map;

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
            'props/grass',
            'characters/player',
            'characters/sheep',
            'characters/wolf',
            'effects/fire',
            'fonts/matchup_pro_12_black',
        ];
        ImageLoader.loadImages(images);

        this.map = new Map(biomeMap);

        setTimeout(() => { // workaround: wait until image loading is done
            this.ecs.addSystem(new CameraFocusUpdater());
            this.ecs.addSystem(new CameraPositionUpdater());
            this.ecs.addSystem(new RandomMovementTargetAssigner(this.map));
            this.ecs.addSystem(new MoveToMovementTarget());
            this.ecs.addSystem(new MovementTargetRemover());

            this.ecs.addSystem(new IncreaseHunger());
            this.ecs.addSystem(new PlantFoodTargetAssigner());
            this.ecs.addSystem(new MeatFoodTargetAssigner());
            this.ecs.addSystem(new EatPlant());
            this.ecs.addSystem(new EatMeat());
            this.ecs.addSystem(new GrassGrower(this.map));
            this.ecs.addSystem(new SpreadFire());
            this.ecs.addSystem(new ApplyFireDamage());
            this.ecs.addSystem(new ApplyHungerDamage());
            this.ecs.addSystem(new RemoveWithoutHealth());

            this.ecs.addSystem(new AdjustDirection());
            this.ecs.addSystem(new MovementAnimationUpdater());
            this.ecs.addSystem(new Animator());

            this.ecs.addSystem(new RemoveIsInViewport());
            this.ecs.addSystem(new AddIsInViewport());
            this.ecs.addSystem(new UpdateZIndex()); // after update is in viewport

            this.ecs.addSystem(new TranslateCanvasContext()); // after camera updates; before renderings

            this.ecs.addSystem(new GroundLayerRenderer());
            this.ecs.addSystem(new SpriteRenderer());
            this.ecs.addSystem(new FireRenderer()); // after sprite renderer
            this.ecs.addSystem(new RestoreCanvasContext());
            this.ecs.addSystem(new DisplayStatistics());

            this.camera = this.entityFactory.create('camera');

            const player = this.entityFactory.create('player');
            this.ecs.addComponent(player, new Position(new Vector(config.generation.size.x, config.generation.size.y).multiply(config.tileSize).divide(2)));

            const ground = this.ecs.addEntity();
            this.ecs.addComponent(ground, this.createGroundLayerComponent());

            this.treeMap.all().forEach(position => this.createTreeAt(position));
            for (let i = 1; i <= config.generation.animals.sheep; i++) {
                const sheep = this.entityFactory.create('sheep');
                this.ecs.addComponent(sheep, new Position(this.map.getRandomLandGridCell().multiply(config.tileSize)));
            }
            for (let i = 1; i <= config.generation.animals.wolves; i++) {
                const wolf = this.entityFactory.create('wolf');
                this.ecs.addComponent(wolf, new Position(this.map.getRandomLandGridCell().multiply(config.tileSize)));
            }

            Input.getInstance().onActionPressed(position => {
                const factor = window.canvas.clientWidth / window.canvas.width;
                const [positionComponent] = this.ecs.query.oneComponent(Position, CameraComponent);
                const target = positionComponent.position.add(position.divide(factor)).round();

                const entities = this
                    .ecs
                    .query
                    .allEntities(Position, Interactable)
                    .filter(([, positionComponent]) => positionComponent.position.distanceTo(target) < config.controls.clickDistance)
                ;
                if (entities.length === 0) {
                    this.ecs.removeComponent(player, MovementTarget);
                    this.ecs.addComponent(player, new MovementTarget(target));
                } else {
                    entities.forEach(([entity]) => this.ecs.addComponent(entity, new OnFire()));
                }
            });

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
        this.ecs.addComponent(tree, new Position(position.multiply(config.tileSize).add(new Vector(config.tileSize, config.tileSize).divide(2))));
        const biome = this.biomeMap.get(position.x, position.y);
        const imageName = `props/tree_${biome.image}`;
        const img = ImageLoader.instance.getImage(imageName);
        const sprite = new Sprite(
            imageName,
            biome.treeOffset,
            new Vector(img.width, img.height),
            new Vector(0, 0),
            1,
        );
        this.ecs.addComponent(tree, sprite);
    }
}
