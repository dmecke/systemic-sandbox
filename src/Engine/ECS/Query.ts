import Circle from '../Math/Circle';
import Component from './Component';
import ComponentClass from './ComponentClass';
import Entity from './Entity';
import QuadTree from '../Type/QuadTree';

export default class Query {

    constructor(
        private readonly componentStorage: Map<string, Map<Entity, Component>>,
        private readonly quadTree: QuadTree<Entity>,
    ) {
    }

    allComponents(...componentClasses) {
        const smallestType = this.getSmallestType(...componentClasses);

        if (smallestType === null) {
            return [];
        }

        const allValues = [];
        this.componentStorage.get(smallestType.name).forEach((component, entity) => {
            const foundValues = componentClasses.map(componentClass => {
                const componentMap = this.componentStorage.get(componentClass.name);
                if (!componentMap) {
                    return null;
                }

                return componentMap.get(entity)
            });

            if (!foundValues.some(component => !component)) {
                allValues.push(foundValues);
            }
        });

        return allValues;
    }

    allComponentsAt(circle: Circle, ...componentClasses) {
        return this
            .quadTree
            .queryCircle(circle)
            .map(element => element.data)
            .filter(entity => this.hasComponents(entity, ...componentClasses))
            .map(entity => componentClasses.map(componentClass => this.componentStorage.get(componentClass.name).get(entity)))
        ;
    }

    allEntities(...componentClasses) {
        const smallestType = this.getSmallestType(...componentClasses);

        if (smallestType === null) {
            return [];
        }

        const entities = [];
        this.componentStorage.get(smallestType.name).forEach((component, entity) => {
            const foundValues = componentClasses.map(componentClass => {
                const componentMap = this.componentStorage.get(componentClass.name);
                if (!componentMap) {
                    return null;
                }

                return componentMap.get(entity);
            });

            if (!foundValues.some(component => !component)) {
                entities.push([entity, ...foundValues]);
            }
        });

        return entities;
    }

    allEntitiesAt(circle: Circle, ...componentClasses) {
        return this
            .quadTree
            .queryCircle(circle)
            .map(element => element.data)
            .filter(entity => this.hasComponents(entity, ...componentClasses))
            .map(entity => [entity, ...componentClasses.map(componentClass => this.componentStorage.get(componentClass.name).get(entity))])
        ;
    }

    oneComponent(...componentClasses) {
        const entityComponents = this.allComponents(...componentClasses);

        if (entityComponents.length === 0) {
            throw new Error('No entity found.');
        }

        if (entityComponents.length > 1) {
            throw new Error('More than one entity found.');
        }

        return entityComponents[0];
    }

    hasComponent<T extends Component>(entity: Entity, componentClass: ComponentClass<T>): boolean {
        if (!this.componentStorage.has(componentClass.name)) {
            return false;
        }

        return this.componentStorage.get(componentClass.name).has(entity);
    }

    hasComponents<T extends Component>(entity: Entity, ...componentClasses: ComponentClass<T>[]): boolean {
        for (const componentClass of componentClasses) {
            if (!this.hasComponent(entity, componentClass)) {
                return false
            }
        }

        return true;
    }

    getComponent<T extends Component>(entity: Entity, componentClass: ComponentClass<T>): T {
        if (!this.componentStorage.has(componentClass.name)) {
            throw new Error(`Entity ${entity} does not have a component ${componentClass.name}.`);
        }

        return this.componentStorage.get(componentClass.name).get(entity) as T;
    }

    private getSmallestType(...componentClasses) {
        const [smallestType] = componentClasses.reduce(([smallestComponentClass, smallestComponentClassLength], currentComponentClass) => {
            const componentMap = this.componentStorage.get(currentComponentClass.name);
            if (componentMap === undefined) {
                return [null, Infinity];
            }
            const currentComponentClassLength = componentMap.size;
            if (currentComponentClassLength < smallestComponentClassLength) {
                return [currentComponentClass, currentComponentClassLength];
            } else {
                return [smallestComponentClass, smallestComponentClassLength];
            }
        }, [null, Infinity]);

        return smallestType;
    }
}
