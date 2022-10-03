import Biome from '../Biome/Biome';
import BiomeComponent from '../Component/BiomeComponent';
import CameraComponent from '../Component/CameraComponent';
import ImageLoader from '../Engine/Assets/ImageLoader';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';
import Vector from '../Engine/Math/Vector';
import config from '../assets/config.json';

export default class GroundLayerRenderer extends System {

    // eslint-disable-next-line @typescript-eslint/ban-types
    componentsRequired = new Set<Function>([BiomeComponent]);

    update(query: Query): void {
        const [positionComponent] = this.ecs.queryAll(Position, CameraComponent)[0];
        const cameraPosition = positionComponent.position;

        query.all().forEach(components => {
            const biomeComponent = components.get(BiomeComponent);

            this
                .getMap(biomeComponent, cameraPosition)
                .forEach(tile => {
                    this.drawTile(
                        tile.biome,
                        tile.position.multiply(config.tileSize),
                        biomeComponent.spriteOffsets.get(tile.position.x, tile.position.y),
                    );
                })
            ;
        });
    }

    drawTile(biome: Biome, position: Vector, sprite: number): void {
        const imageName = `tiles/${biome.image}`;
        try {
            ImageLoader.instance.fromName(
                imageName,
                new Vector(sprite * config.tileSize, 0),
                new Vector(config.tileSize, config.tileSize),
                position,
            ).draw();
        } catch (e) {
            throw new Error(`Could not render tile "${imageName}" at ${position.x}|${position.y}.\n\n${e}`);
        }
    }

    private getMap(groundLayerComponent: BiomeComponent, cameraPosition: Vector): { biome: Biome, position: Vector }[] {
        const buffer = new Vector(2, 2);
        const cameraTopLeftTile = cameraPosition.divide(config.tileSize).floor().subtract(buffer);
        const cameraBottomRightTile = cameraTopLeftTile.add(this.cameraSize).add(buffer.multiply(2));

        const map = [];
        for (let y = cameraTopLeftTile.y; y < cameraBottomRightTile.y; y++) {
            for (let x = cameraTopLeftTile.x; x < cameraBottomRightTile.x; x++) {
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
