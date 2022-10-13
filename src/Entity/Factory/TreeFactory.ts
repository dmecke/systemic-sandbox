import BiomeMap from '../../ProceduralGeneration/BiomeMap';
import Entity from '../../Engine/ECS/Entity';
import EntityFactory from '../../Engine/ECS/EntityFactory';
import ImageLoader from '../../Engine/Assets/ImageLoader';
import Position from '../../Component/Position';
import Sprite from '../../Component/Sprite';
import Vector from '../../Engine/Math/Vector';
import config from '../../assets/config.json';

export default class TreeFactory {
    constructor(
        private readonly entityFactory: EntityFactory,
        private readonly biomeMap: BiomeMap,
    ) {
    }

    create(position: Vector): Entity {
        const biome = this.biomeMap.get(position.x, position.y);
        const imageName = `props/tree_${biome.image}.png`;
        const img = ImageLoader.instance.getImage(imageName);
        const sprite = new Sprite(
            imageName,
            biome.treeOffset,
            new Vector(img.width, img.height),
            new Vector(0, 0),
            1,
        );

        return this.entityFactory.create('tree', [
            new Position(position.multiply(config.tileSize).add(new Vector(config.tileSize, config.tileSize).divide(2))),
            sprite,
        ]);
    }
}
