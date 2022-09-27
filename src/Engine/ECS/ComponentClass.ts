import Component from './Component';

type ComponentClass<T extends Component> = new (...args: unknown[]) => T;

export default ComponentClass;
