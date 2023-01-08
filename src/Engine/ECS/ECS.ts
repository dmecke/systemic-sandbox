import Component from './Component';
import Entity from './Entity';
import QuadTree from '@dmecke/game-engine/lib/Type/QuadTree';
import Query from './Query';
import System from './System';

export default class ECS {

    private systems = new Set<System>();
    private readonly componentStorage = new Map<string, Map<Entity, Component>>();

    private nextEntityId = 1;
    private entitiesToDestroy = new Array<Entity>();

    constructor(
        readonly quadTree: QuadTree<Entity>,
    ) {
    }

    addEntity(): Entity {
        const entity = this.nextEntityId;
        this.nextEntityId++;

        return entity;
    }

    removeEntity(entity: Entity): void {
        this.entitiesToDestroy.push(entity);
    }

    addComponent(entity: Entity, component: Component): void {
        if (!this.componentStorage.has(component.constructor.name)) {
            this.componentStorage.set(component.constructor.name, new Map());
        }
        this.componentStorage.get(component.constructor.name).set(entity, component);
    }

    get query(): Query {
        return new Query(this.componentStorage, this.quadTree);
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    removeComponent(entity: Entity, componentClass: Function): void {
        if (!this.componentStorage.has(componentClass.name)) {
            return;
        }

        this.componentStorage.get(componentClass.name).delete(entity);
    }

    addSystem(system: System): void {
        system.ecs = this;

        this.systems.add(system);
    }

    removeSystem(system: System): void {
        this.systems.delete(system);
    }

    update(delta: number): void {
        for (const system of this.systems.values()) {
            system.update(this.query, delta);
        }

        while (this.entitiesToDestroy.length > 0) {
            this.destroyEntity(this.entitiesToDestroy.pop());
        }
    }

    private destroyEntity(entity: Entity): void {
        for (const components of this.componentStorage.values()) {
            components.delete(entity);
        }
    }
}
