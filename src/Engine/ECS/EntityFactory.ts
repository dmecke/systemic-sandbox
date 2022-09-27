import Component from './Component';
import ECS from './ECS';
import Entity from './Entity';

export default class EntityFactory {

    constructor(
        private readonly ecs: ECS,
        private readonly entities: Map<string, { name: string }[]>,
        private readonly factories: Map<string, { fromData(data: unknown): Component }>,
    ) {
    }

    create(name: string): Entity {
        const entity = this.ecs.addEntity();

        this
            .find(name)
            .forEach(component => {
                this.ecs.addComponent(entity, component);
            })
        ;

        return entity;
    }

    private find(name: string): Component[] {
        const entityComponents = this.entities.get(name);
        if (!entityComponents) {
            throw new Error(`Could not find data for entity "${name}".`);
        }

        return entityComponents.map(data => {
            const factory = this.factories.get(data.name);
            if (!factory) {
                throw new Error(`Could not find factory for "${data.name}".`);
            }
            if (!factory.fromData) {
                throw new Error(`"${data.name}" does not have a fromData method.`);
            }

            return factory.fromData(data);
        });
    }
}
