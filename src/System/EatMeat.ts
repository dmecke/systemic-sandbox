import EatsMeat from '../Component/EatsMeat';
import Food from '../Component/Food';
import Health from '../Component/Health';
import Hunger from '../Component/Hunger';
import Meat from '../Component/Meat';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';

export default class EatMeat extends System {
    update(query: Query): void {
        const meat = query.allComponents(Position, Health, Meat, Food);
        if (meat.length === 0) {
            return;
        }

        for (const [hunger, position] of query.allComponents(Hunger, Position, EatsMeat)) {
            const eatableMeat = meat
                .filter(([meatPosition]) => meatPosition.position.distanceTo(position.position) < 1)
            ;
            if (eatableMeat.length > 0) {
                hunger.hunger = Math.max(0, hunger.hunger - 50);
                const [, health] = eatableMeat[0];
                health.health = 0;
            }
        }
    }
}
