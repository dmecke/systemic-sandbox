import Biome from '../Biome/Biome';
import GroundLayerComponent from '../Component/GroundLayerComponent';
import ImageLoader from '../Engine/Assets/ImageLoader';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import Renderable from '../Component/Renderable';
import System from '../Engine/ECS/System';
import Vector from '../Engine/Math/Vector';
import config from '../assets/config.json';

export default class GroundLayerRenderer extends System {

    // eslint-disable-next-line @typescript-eslint/ban-types
    componentsRequired = new Set<Function>([GroundLayerComponent, Renderable]);

    update(query: Query): void {
        query.all().forEach(components => {
            const layerComponent = components.get(GroundLayerComponent);
            const renderable = components.get(Renderable);

            this
                .getMap(layerComponent, this.ecs.getComponents(renderable.camera).get(Position).position)
                .forEach(tile => {
                    this.drawTile(
                        tile.biome,
                        tile.position.multiply(config.tileSize),//.subtract(cameraPosition),
                        layerComponent.sprite.get(tile.position.x, tile.position.y),
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
            ).draw(window.ctx);
        } catch (e) {
            throw new Error(`Could not render tile "${imageName}" at ${position.x}|${position.y}.\n\n${e}`);
        }
    }

    private getMap(groundLayerComponent: GroundLayerComponent, cameraPosition: Vector): { biome: Biome, position: Vector }[] {
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
