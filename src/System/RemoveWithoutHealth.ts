import Health from '../Component/Health';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';

export default class RemoveWithoutHealth extends System {

    // eslint-disable-next-line @typescript-eslint/ban-types
    componentsRequired = new Set<Function>([Health]);

    update(query: Query): void {
        for (const [entity, healthComponent] of query.allEntities(Health)) {
            if (healthComponent.health <= 0) {
                this.ecs.removeEntity(entity);
            }
        }
    }
}
