import Entity from '../../Engine/ECS/Entity';
import EntityFactory from '../../Engine/ECS/EntityFactory';
import Position from '../../Component/Position';
import Vector from '../../Engine/Math/Vector';
import config from '../../assets/config.json';

export default class GrassFactory {
    constructor(
        private readonly entityFactory: EntityFactory,
    ) {
    }

    create(position: Vector): Entity {
        return this.entityFactory.create('grass', [
            new Position(position.multiply(config.tileSize)),
        ]);
    }
}
