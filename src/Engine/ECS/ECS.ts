import Component from './Component';
import ComponentClass from './ComponentClass';
import ComponentContainer from './ComponentContainer';
import Entity from './Entity';
import Query from './Query';
import System from './System';

export default class ECS {

    private entities = new Map<Entity, ComponentContainer>();
    private systems = new Map<System, Set<Entity>>();
    private readonly componentStorage = new Map<string, Map<Entity, Component>>();

    private nextEntityId = 1;
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

        if (!this.componentStorage.has(component.constructor.name)) {
            this.componentStorage.set(component.constructor.name, new Map());
        }
        this.componentStorage.get(component.constructor.name).set(entity, component);
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

    queryAll<T extends Component>(...types: ComponentClass<T>[]) {
        const [smallestType] = types.reduce(([smallest, smallestLength], current) => {
            const currentLength = this.componentStorage.get(current.name).size;
            if (currentLength < smallestLength) {
                return [current, currentLength];
            } else {
                return [smallest, smallestLength];
            }
        }, [null, Infinity]);

        const allValues = [];
        this.componentStorage.get(smallestType.name).forEach((component, entity) => {
            const foundValues = types.map(componentClass => this.componentStorage.get(componentClass.name).get(entity));

            if (!foundValues.some(component => component === null)) {
                allValues.push(foundValues);
            }
        });

        return allValues;
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
