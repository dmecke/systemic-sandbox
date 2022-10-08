import AddIsInViewport from './System/AddIsInViewport';
import AdjustDirection from './System/AdjustDirection';
import AnimalReproduction from './System/AnimalReproduction';
import AnimalReproductionTargetAssigner from './System/AnimalReproductionTargetAssigner';
import Animator from './System/Animator';
import ApplyFireDamage from './System/ApplyFireDamage';
import ApplyHungerDamage from './System/ApplyHungerDamage';
import Area from './Engine/Math/Area';
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
import GrassFactory from './Entity/Factory/GrassFactory';
import GrassGrower from './System/GrassGrower';
import GroundFactory from './Entity/Factory/GroundFactory';
import GroundLayerRenderer from './System/GroundLayerRenderer';
import ImageLoader from './Engine/Assets/ImageLoader';
import IncreaseHunger from './System/IncreaseHunger';
import IncreaseReproductionUrge from './System/IncreaseReproductionUrge';
import Input from './Input/Input';
import Interactable from './Component/Interactable';
import Map from './Map/Map';
import MeatFoodTargetAssigner from './System/MeatFoodTargetAssigner';
import MoveToMovementTarget from './System/MoveToMovementTarget';
import MovementAnimationUpdater from './System/MovementAnimationUpdater';
import MovementTarget from './Component/MovementTarget';
import MovementTargetRemover from './System/MovementTargetRemover';
import OnFire from './Component/OnFire';
import PlantFoodTargetAssigner from './System/PlantFoodTargetAssigner';
import Position from './Component/Position';
import QuadTree from './Engine/Type/QuadTree';
import RandomMovementTargetAssigner from './System/RandomMovementTargetAssigner';
import RemoveIsInViewport from './System/RemoveIsInViewport';
import RemoveWithoutHealth from './System/RemoveWithoutHealth';
import RestoreCanvasContext from './System/RestoreCanvasContext';
import SheepFactory from './Entity/Factory/SheepFactory';
import SpreadFire from './System/SpreadFire';
import SpriteRenderer from './System/SpriteRenderer';
import TranslateCanvasContext from './System/TranslateCanvasContext';
import TreeFactory from './Entity/Factory/TreeFactory';
import TreeMap from './ProceduralGeneration/TreeMap';
import UpdateQuadTree from './System/UpdateQuadTree';
import UpdateZIndex from './System/UpdateZIndex';
import Vector from './Engine/Math/Vector';
import WolfFactory from './Entity/Factory/WolfFactory';
import config from './assets/config.json';
import entityFactoryMap from './Entity/entityFactoryMap';
import entityMap from './Entity/entityMap';
import images from './assets/images.json';

export default class Game {
    private fps = new Fps();
    private readonly ecs = new ECS(new QuadTree<Entity>(new Area(Vector.null(), new Vector(config.generation.size.x, config.generation.size.y).multiply(config.tileSize)), 128));
    private readonly entityFactory = new EntityFactory(this.ecs, entityMap, entityFactoryMap);
    private readonly treeFactory = new TreeFactory(this.entityFactory, this.biomeMap);
    private readonly sheepFactory = new SheepFactory(this.entityFactory);
    private readonly wolfFactory = new WolfFactory(this.entityFactory);
    private readonly groundFactory = new GroundFactory(this.entityFactory, this.biomeMap);
    private readonly grassFactory = new GrassFactory(this.entityFactory);
    private camera: Entity;
    private player: Entity;
    private readonly map: Map;

    constructor(
        private readonly biomeMap: BiomeMap,
        private readonly treeMap: TreeMap,
    ) {
        this.map = new Map(biomeMap);

        ImageLoader
            .loadImages(images)
            .then(() => {
                this.createSystems();
                this.createEntities();

                Input.getInstance().onActionPressed(position => this.handleClick(position));

                requestAnimationFrame(() => this.update());
            })
        ;
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

    private createSystems(): void {
        this.ecs.addSystem(new CameraFocusUpdater());
        this.ecs.addSystem(new CameraPositionUpdater());
        this.ecs.addSystem(new RandomMovementTargetAssigner(this.map));
        this.ecs.addSystem(new MoveToMovementTarget());
        this.ecs.addSystem(new MovementTargetRemover());

        this.ecs.addSystem(new UpdateQuadTree()); // after all movements

        this.ecs.addSystem(new IncreaseHunger());
        this.ecs.addSystem(new IncreaseReproductionUrge());
        this.ecs.addSystem(new PlantFoodTargetAssigner());
        this.ecs.addSystem(new MeatFoodTargetAssigner());
        this.ecs.addSystem(new AnimalReproductionTargetAssigner('Wolf'));
        this.ecs.addSystem(new AnimalReproductionTargetAssigner('Sheep'));
        this.ecs.addSystem(new AnimalReproduction(this.wolfFactory, 'Wolf'));
        this.ecs.addSystem(new AnimalReproduction(this.sheepFactory, 'Sheep'));
        this.ecs.addSystem(new EatPlant());
        this.ecs.addSystem(new EatMeat());
        this.ecs.addSystem(new GrassGrower(this.map, this.grassFactory));
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
    }

    private createEntities(): void {
        this.camera = this.entityFactory.create('camera', [
            new Position(new Vector(config.generation.size.x, config.generation.size.y).multiply(config.tileSize).subtract(new Vector(window.canvas.width, window.canvas.height)).divide(2)),
        ]);

        this.player = this.entityFactory.create('player', [
            new Position(new Vector(config.generation.size.x, config.generation.size.y).multiply(config.tileSize).divide(2)),
        ]);

        this.groundFactory.create();

        this.treeMap.all().forEach(position => this.treeFactory.create(position));
        Array.from({ length: config.generation.grass }, () => this.grassFactory.create(this.map.getRandomLandGridCell().multiply(config.tileSize)));
        Array.from({ length: config.generation.animals.sheep }, () => this.sheepFactory.create(this.map.getRandomLandGridCell().multiply(config.tileSize)));
        Array.from({ length: config.generation.animals.wolves }, () => this.wolfFactory.create(this.map.getRandomLandGridCell().multiply(config.tileSize)));
    }

    private handleClick(position: Vector): void {
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
            this.ecs.removeComponent(this.player, MovementTarget);
            this.ecs.addComponent(this.player, new MovementTarget(target));
        } else {
            entities.forEach(([entity]) => this.ecs.addComponent(entity, new OnFire()));
        }
    }
}
