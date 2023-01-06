import Entity from '../../Engine/ECS/Entity';
import EntityFactory from '../../Engine/ECS/EntityFactory';
import Gender from '../../Component/Gender';
import Position from '../../Component/Position';
import Vector from '@dmecke/game-engine/lib/Math/Vector';

export default class SheepFactory {
    constructor(
        private readonly entityFactory: EntityFactory,
    ) {
    }

    create(position: Vector): Entity {
        return this.entityFactory.create('sheep', [
            new Position(position),
            Gender.random(),
        ]);
    }
}
