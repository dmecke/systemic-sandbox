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

    one(): ComponentContainer {
        if (this._entities.size === 0) {
            throw new Error('No entity found.');
        }
        if (this._entities.size > 1) {
            throw new Error('More than one entity found.');
        }

        return this.all()[0];
    }

    get size(): number {
        return this._entities.size;
    }
}
