import Health from '../Component/Health';
import OnFire from '../Component/OnFire';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';

export default class ApplyFireDamage extends System {

    // eslint-disable-next-line @typescript-eslint/ban-types
    componentsRequired = new Set<Function>([Health, OnFire]);

    update(query: Query): void {
        for (const [healthComponent] of query.allComponents(Health, OnFire)) {
            healthComponent.health--;
        }
    }
}
