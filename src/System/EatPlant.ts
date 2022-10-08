import Circle from '../Engine/Math/Circle';
import EatsPlants from '../Component/EatsPlants';
import Food from '../Component/Food';
import Health from '../Component/Health';
import Hunger from '../Component/Hunger';
import Plant from '../Component/Plant';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';

export default class EatPlant extends System {
    update(query: Query): void {
        for (const [hunger, position] of query.allComponents(Hunger, Position, EatsPlants)) {
            const eatablePlants = this
                .ecs
                .query
                .allComponentsAt(new Circle(position.position, 1), Health, Plant, Food)
            ;
            if (eatablePlants.length > 0) {
                hunger.hunger = Math.max(0, hunger.hunger - 50);
                (eatablePlants[0][0] as Health).health -= 50;
            }
        }
    }
}
