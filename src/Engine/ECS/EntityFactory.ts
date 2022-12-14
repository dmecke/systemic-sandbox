import Component from './Component';
import ECS from './ECS';
import Entity from './Entity';

export default class EntityFactory {

    constructor(
        private readonly ecs: ECS,
        private readonly entities: Map<string, Record<string, unknown>>,
        private readonly factories: Map<string, { fromData(data: unknown): Component }>,
    ) {
    }

    create(name: string, additionalComponents: Component[] = []): Entity {
        const entity = this.ecs.addEntity();

        this
            .find(name)
            .forEach(component => this.ecs.addComponent(entity, component))
        ;

        additionalComponents.forEach(component => this.ecs.addComponent(entity, component))

        return entity;
    }

    private find(name: string): Component[] {
        const entityComponents = this.entities.get(name);
        if (!entityComponents) {
            throw new Error(`Could not find data for entity "${name}".`);
        }

        return Object.keys(entityComponents).map(key => {
            const factory = this.factories.get(key);
            if (!factory) {
                throw new Error(`Could not find factory for "${key}".`);
            }
            if (!factory.fromData) {
                throw new Error(`"${key}" does not have a fromData method.`);
            }

            return factory.fromData(entityComponents[key]);
        });
    }
}
