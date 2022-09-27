import ComponentContainer from './ComponentContainer';
import ECS from './ECS';
import Entity from './Entity';

export default class Query {
    constructor(
        private ecs: ECS,
        private _entities: Set<Entity>,
    ) {
    }

    entities(): Entity[] {
        return [...this._entities];
    }

    all(): ComponentContainer[] {
        return [...this._entities].map(entity => this.ecs.getComponents(entity));
    }

    get size(): number {
        return this._entities.size;
    }
}
