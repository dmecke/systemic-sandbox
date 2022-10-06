import ECS from '../../Engine/ECS/ECS';
import Entity from '../../Engine/ECS/Entity';
import EntityFactory from '../../Engine/ECS/EntityFactory';
import Gender from '../../Component/Gender';
import Position from '../../Component/Position';
import Vector from '../../Engine/Math/Vector';

export default class SheepFactory {
    constructor(
        private readonly ecs: ECS,
        private readonly entityFactory: EntityFactory,
    ) {
    }

    create(position: Vector): Entity {
        const sheep = this.entityFactory.create('sheep');
        this.ecs.addComponent(sheep, new Position(position));
        this.ecs.addComponent(sheep, Gender.random());

        return sheep;
    }
}
