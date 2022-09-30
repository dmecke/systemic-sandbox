import Component from './Component';
import ComponentContainer from './ComponentContainer';
import Entity from './Entity';
import Query from './Query';
import System from './System';

export default class ECS {

    private entities = new Map<Entity, ComponentContainer>();
    private systems = new Map<System, Set<Entity>>();

    private nextEntityId = 0;
    private entitiesToDestroy = new Array<Entity>();

    addEntity(): Entity {
        const entity = this.nextEntityId;
        this.nextEntityId++;
        this.entities.set(entity, new ComponentContainer());

        return entity;
    }

    removeEntity(entity: Entity): void {
        this.entitiesToDestroy.push(entity);
    }

    addComponent(entity: Entity, component: Component): void {
        this.entities.get(entity).add(component);
        this.checkEntity(entity);
    }

    getComponents(entity: Entity): ComponentContainer {
        return this.entities.get(entity);
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    removeComponent(entity: Entity, componentClass: Function): void {
        this.entities.get(entity).delete(componentClass);
        this.checkEntity(entity);
    }

    addSystem(system: System): void {
        if (system.componentsRequired.size === 0) {
            throw new Error('System has empty Components list.');
        }

        system.ecs = this;

        this.systems.set(system, new Set());
        for (const entity of this.entities.keys()) {
            this.checkEntitySystem(entity, system);
        }
    }

    removeSystem(system: System): void {
        this.systems.delete(system);
    }

    update(): void {
        for (const [system, entities] of this.systems.entries()) {
            system.update(new Query(this, entities));
        }

        while (this.entitiesToDestroy.length > 0) {
            this.destroyEntity(this.entitiesToDestroy.pop());
        }
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    findEntitiesWithComponents(componentClasses: Iterable<Function>): Entity[] {
        const entities = [];
        for (const entry of this.entities.entries()) {
            if (entry[1].hasAll(componentClasses)) {
                entities.push(entry[0]);
            }
        }

        return entities;
    }

    private destroyEntity(entity: Entity): void {
        this.entities.delete(entity);
        for (const systems of this.systems.values()) {
            systems.delete(entity);
        }
    }

    private checkEntity(entity: Entity): void {
        for (const system of this.systems.keys()) {
            this.checkEntitySystem(entity, system);
        }
    }

    private checkEntitySystem(entity: Entity, system: System): void {
        const have = this.entities.get(entity);
        const need = system.componentsRequired;
        if (have.hasAll(need)) {
            this.systems.get(system).add(entity);
        } else {
            this.systems.get(system).delete(entity);
        }
    }
}
