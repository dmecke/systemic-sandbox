import Health from '../Component/Health';
import Hunger from '../Component/Hunger';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';

export default class ApplyHungerDamage extends System {
    update(query: Query): void {
        for (const [healthComponent, hungerComponent] of query.allComponents(Health, Hunger)) {
            if (hungerComponent.hunger >= 100) {
                healthComponent.health--;
            }
        }
    }
}
