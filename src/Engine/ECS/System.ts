import ECS from './ECS';
import Query from './Query';

export default abstract class System {

    ecs: ECS;

    // eslint-disable-next-line @typescript-eslint/ban-types
    abstract componentsRequired: Set<Function>;

    abstract update(query: Query): void;
}
