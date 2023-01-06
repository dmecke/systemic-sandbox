import Hunger from '../Component/Hunger';
import Query from '../Engine/ECS/Query';
import Rng from '@dmecke/game-engine/lib/Math/Rng';
import System from '../Engine/ECS/System';

export default class IncreaseHunger extends System {
    update(query: Query): void {
        for (const [hunger] of query.allComponents(Hunger)) {
            if (Rng.instance.chance(10)) {
                hunger.hunger = Math.min(100, hunger.hunger + 1);
            }
        }
    }
}
