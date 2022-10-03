import ECS from './ECS';
import Query from './Query';

export default abstract class System {

    ecs: ECS;

    abstract update(query: Query): void;
}
