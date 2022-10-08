import Entity from '../../Engine/ECS/Entity';
import EntityFactory from '../../Engine/ECS/EntityFactory';
import Position from '../../Component/Position';
import Vector from '../../Engine/Math/Vector';

export default class GrassFactory {
    constructor(
        private readonly entityFactory: EntityFactory,
    ) {
    }

    create(position: Vector): Entity {
        return this.entityFactory.create('grass', [
            new Position(position),
        ]);
    }
}
