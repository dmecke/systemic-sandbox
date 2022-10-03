import Food from '../Component/Food';
import Health from '../Component/Health';
import Hunger from '../Component/Hunger';
import Plant from '../Component/Plant';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';

export default class EatGrass extends System {
    // eslint-disable-next-line @typescript-eslint/ban-types
    componentsRequired = new Set<Function>([Hunger, Position]);

    update(query: Query): void {
        const plants = query.allComponents(Position, Health, Plant, Food);
        if (plants.length === 0) {
            return;
        }

        for (const [hunger, position] of query.allComponents(Hunger, Position)) {
            const eatablePlants = plants
                .filter(([plantPosition]) => plantPosition.position.distanceTo(position.position) < 1)
            ;
            if (eatablePlants.length > 0) {
                hunger.hunger = Math.max(0, hunger.hunger - 50);
                const [, health] = eatablePlants[0];
                health.health -= 50;
            }
        }
    }
}
