import Component from './Component';
import ComponentClass from './ComponentClass';

export default class ComponentContainer {

    // eslint-disable-next-line @typescript-eslint/ban-types
    private map = new Map<Function, Component>();

    add(component: Component): void {
        this.map.set(component.constructor, component);
    }

    get<T extends Component>(componentClass: ComponentClass<T>): T {
        return this.map.get(componentClass) as T;
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    has(componentClass: Function): boolean {
        return this.map.has(componentClass);
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    hasAll(componentClasses: Iterable<Function>): boolean {
        for (const cls of componentClasses) {
            if (!this.map.has(cls)) {
                return false;
            }
        }

        return true;
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    delete(componentClass: Function): void {
        this.map.delete(componentClass);
    }
}
