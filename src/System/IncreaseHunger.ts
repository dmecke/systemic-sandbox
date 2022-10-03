import Hunger from '../Component/Hunger';
import Query from '../Engine/ECS/Query';
import Rng from '../Engine/Math/Rng';
import System from '../Engine/ECS/System';

export default class IncreaseHunger extends System {
    // eslint-disable-next-line @typescript-eslint/ban-types
    componentsRequired = new Set<Function>([Hunger]);

    update(query: Query): void {
        for (const [hunger] of query.allComponents(Hunger)) {
            if (Rng.getInstance(window.seed.toString()).chance(10)) {
                hunger.hunger = Math.min(100, hunger.hunger + 1);
            }
        }
    }
}
