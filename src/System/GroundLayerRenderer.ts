import Biome from '../Biome/Biome';
import GroundLayerComponent from '../Component/GroundLayerComponent';
import ImageLoader from '../Engine/Assets/ImageLoader';
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

            const size = config.generation.size;
            for (let y = 0; y < size.y; y++) {
                for (let x = 0; x < size.x; x++) {
                    const biome = factory(layerComponent.heightMap[y][x], layerComponent.moistureMap[y][x]);
                    this.drawTile(biome, new Vector(x, y).multiply(config.tileSize));
                }
            }
        });
    }

    drawTile(biome: Biome, position: Vector): void {
        const imageName = `tiles/${biome.image}`;
        try {
            ImageLoader.instance.fromName(
                imageName,
                new Vector(0, 0),
                new Vector(config.tileSize, config.tileSize),
                position,
            ).draw(window.ctx);
        } catch (e) {
            throw new Error(`Could not render tile "${imageName}" at ${position.x}|${position.y}.\n\n${e}`);
        }
    }
}
