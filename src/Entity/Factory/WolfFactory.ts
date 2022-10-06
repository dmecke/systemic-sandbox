import ECS from '../../Engine/ECS/ECS';
import Entity from '../../Engine/ECS/Entity';
import EntityFactory from '../../Engine/ECS/EntityFactory';
import Gender from '../../Component/Gender';
import Position from '../../Component/Position';
import Vector from '../../Engine/Math/Vector';

export default class WolfFactory {
    constructor(
        private readonly ecs: ECS,
        private readonly entityFactory: EntityFactory,
    ) {
    }

    create(position: Vector): Entity {
        return this.entityFactory.create('wolf', [
            new Position(position),
            Gender.random(),
        ]);
    }
}
