import Query from '../Engine/ECS/Query';
import ReproductionUrge from '../Component/ReproductionUrge';
import Rng from '../Engine/Math/Rng';
import System from '../Engine/ECS/System';

export default class IncreaseReproductionUrge extends System {
    update(query: Query): void {
        for (const [urge] of query.allComponents(ReproductionUrge)) {
            if (Rng.getInstance(window.seed.toString()).chance(10)) {
                urge.urge = Math.min(100, urge.urge + 1);
            }
        }
    }
}
