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
        const wolf = this.entityFactory.create('wolf');
        this.ecs.addComponent(wolf, new Position(position));
        this.ecs.addComponent(wolf, Gender.random());

        return wolf;
    }
}
