import Biome from '../Biome/Biome';
import BiomeComponent from '../Component/BiomeComponent';
import CameraComponent from '../Component/CameraComponent';
import ImageLoader from '../Engine/Assets/ImageLoader';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';
import Vector from '@dmecke/game-engine/lib/Math/Vector';
import config from '../assets/config.json';

export default class GroundLayerRenderer extends System {
    private readonly offscreenCanvas: HTMLCanvasElement;
    private readonly offscreenCtx: CanvasRenderingContext2D;
    private cameraPosition: Vector|null = null;

    constructor() {
        super();

        this.offscreenCanvas = document.createElement('canvas');
        this.offscreenCanvas.width = window.canvas.width;
        this.offscreenCanvas.height = window.canvas.height;
        this.offscreenCanvas.style.imageRendering = '-moz-crisp-edges';
        this.offscreenCanvas.style.imageRendering = '-webkit-crisp-edges';
        this.offscreenCanvas.style.imageRendering = 'pixelated';
        this.offscreenCanvas.style.imageRendering = 'crisp-edges';
        this.offscreenCtx = this.offscreenCanvas.getContext('2d');
    }

    update(query: Query): void {
        const [positionComponent] = query.oneComponent(Position, CameraComponent);
        const cameraPosition = positionComponent.position;

        const [biomeComponent] = query.oneComponent(BiomeComponent);

        if (this.cameraPosition === null || !this.cameraPosition.equals(cameraPosition)) {
            this.cameraPosition = cameraPosition;
            this.offscreenCtx.clearRect(0, 0, this.offscreenCanvas.width, this.offscreenCanvas.height);
            this
                .getMap(biomeComponent, cameraPosition)
                .forEach(tile => {
                    this.drawTile(
                        tile.biome,
                        tile.position.multiply(config.tileSize).subtract(cameraPosition).floor(),
                        biomeComponent.spriteOffsets.get(tile.position.x, tile.position.y),
                    );
                })
            ;
        }

        window.ctx.drawImage(this.offscreenCanvas, Math.ceil(cameraPosition.x), Math.ceil(cameraPosition.y));
    }

    drawTile(biome: Biome, position: Vector, sprite: Vector): void {
        const imageName = `tiles/${biome.image}.png`;
        try {
            ImageLoader.instance.fromName(
                imageName,
                sprite.multiply(config.tileSize),
                new Vector(config.tileSize, config.tileSize),
                position,
            ).draw(this.offscreenCtx);
        } catch (e) {
            throw new Error(`Could not render tile "${imageName}" at ${position.x}|${position.y}.\n\n${e}`);
        }
    }

    private getMap(groundLayerComponent: BiomeComponent, cameraPosition: Vector): { biome: Biome, position: Vector }[] {
        const cameraTopLeftTile = cameraPosition.divide(config.tileSize).floor();
        const cameraBottomRightTile = cameraTopLeftTile.add(this.cameraSize);

        const map = [];
        for (let y = cameraTopLeftTile.y; y <= cameraBottomRightTile.y; y++) {
            for (let x = cameraTopLeftTile.x; x <= cameraBottomRightTile.x; x++) {
                if (groundLayerComponent.biomeMap.has(x, y)) {
                    const position = new Vector(x, y);
                    const biome = groundLayerComponent.biomeMap.get(x, y);
                    map.push({position, biome});
                }
            }
        }

        return map;
    }

    private get cameraSize(): Vector {
        return new Vector(window.ctx.canvas.width, window.ctx.canvas.height).divide(config.tileSize).ceil();
    }
}
