import Biome from '../Biome/Biome';
import GroundLayerComponent from '../Component/GroundLayerComponent';
import ImageLoader from '../Engine/Assets/ImageLoader';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';
import Vector from '../Engine/Math/Vector';
import config from '../assets/config.json';
import factory from '../Biome/Factory';

export default class GroundLayerRenderer extends System {

    // eslint-disable-next-line @typescript-eslint/ban-types
    componentsRequired = new Set<Function>([GroundLayerComponent]);

    update(query: Query): void {
        query.all().forEach(components => {
            const layerComponent = components.get(GroundLayerComponent);
            const cameraPosition = this.ecs.getComponents(layerComponent.camera).get(Position).position;

            this.getMap(layerComponent).forEach(tile => {
                this.drawTile(tile.biome, tile.position.multiply(config.tileSize).subtract(cameraPosition), layerComponent.offset[tile.position.y][tile.position.x]);
            });
        });
    }

    drawTile(biome: Biome, position: Vector, tileOffset: number): void {
        const imageName = `tiles/${biome.image}`;
        try {
            ImageLoader.instance.fromName(
                imageName,
                new Vector(tileOffset * 8, 0),
                new Vector(config.tileSize, config.tileSize),
                position,
            ).draw(window.ctx);
        } catch (e) {
            throw new Error(`Could not render tile "${imageName}" at ${position.x}|${position.y}.\n\n${e}`);
        }
    }

    private getMap(groundLayerComponent: GroundLayerComponent): { biome: Biome, position: Vector }[] {
        const cameraTopLeftTile = this.ecs.getComponents(groundLayerComponent.camera).get(Position).position.divide(config.tileSize).floor();
        const cameraBottomRightTile = cameraTopLeftTile.add(this.cameraSize);

        const map = [];
        for (let y = cameraTopLeftTile.y; y < cameraBottomRightTile.y; y++) {
            for (let x = cameraTopLeftTile.x; x < cameraBottomRightTile.x; x++) {
                const position = new Vector(x, y);
                const biome = factory(groundLayerComponent.heightMap[y][x], groundLayerComponent.moistureMap[y][x]);
                map.push({ position, biome });
            }
        }

        return map;
    }

    private get cameraSize(): Vector {
        return new Vector(window.ctx.canvas.width, window.ctx.canvas.height).divide(config.tileSize).ceil();
    }
}
