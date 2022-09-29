import Biome from '../Biome/Biome';
import ImageLoader from '../Engine/Assets/ImageLoader';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';
import TreeLayerComponent from '../Component/TreeLayerComponent';
import Vector from '../Engine/Math/Vector';
import config from '../assets/config.json';

export default class TreeLayerRenderer extends System {

    // eslint-disable-next-line @typescript-eslint/ban-types
    componentsRequired = new Set<Function>([TreeLayerComponent]);

    update(query: Query): void {
        query.all().forEach(components => {
            const layerComponent = components.get(TreeLayerComponent);
            const cameraPosition = this.ecs.getComponents(layerComponent.camera).get(Position).position;

            this.getMap(layerComponent).forEach(tree => {
                this.drawTile(
                    tree.biome,
                    tree.position.multiply(config.tileSize).subtract(cameraPosition),
                );
            });
        });
    }

    drawTile(biome: Biome, position: Vector): void {
        const imageName = `props/tree_${biome.image}`;
        try {
            const img = ImageLoader.instance.getImage(imageName);
            ImageLoader.instance.fromName(
                imageName,
                new Vector(0, 0),
                new Vector(img.width, img.height),
                position.subtract(new Vector(img.width / 2, img.height)),
            ).draw(window.ctx);
        } catch (e) {
            throw new Error(`Could not render tile "${imageName}" at ${position.x}|${position.y}.\n\n${e}`);
        }
    }

    private getMap(layerComponent: TreeLayerComponent): { biome: Biome, position: Vector }[] {
        const buffer = new Vector(8, 8);
        const cameraTopLeftTile = this.ecs.getComponents(layerComponent.camera).get(Position).position.divide(config.tileSize).floor().subtract(buffer);
        const cameraBottomRightTile = cameraTopLeftTile.add(this.cameraSize).add(buffer.multiply(2));

        const map = [];
        for (let y = cameraTopLeftTile.y; y < cameraBottomRightTile.y; y++) {
            for (let x = cameraTopLeftTile.x; x < cameraBottomRightTile.x; x++) {
                if (layerComponent.treeMap.get(x, y)) {
                    const position = new Vector(x, y);
                    const biome = layerComponent.biomeMap.get(x, y);
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
