import Circle from '../Engine/Math/Circle';
import Entity from '../Engine/ECS/Entity';
import Flammable from '../Component/Flammable';
import OnFire from '../Component/OnFire';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import Rng from '../Engine/Math/Rng';
import System from '../Engine/ECS/System';
import config from '../assets/config.json';

export default class SpreadFire extends System {
    update(query: Query): void {
        const onFire = query.allComponents(Position, OnFire);
        if (onFire.length === 0) {
            return;
        }

        for (const [onFirePositionComponent] of onFire) {
            this
                .ecs
                .query
                .allEntitiesAt(new Circle(onFirePositionComponent.position, config.systems.fireSpreadDistance), Flammable, Position)
                .filter(() => Rng.getInstance(window.seed.toString()).chance(50))
                .filter(([entity]) => !this.ecs.query.hasComponent((entity as Entity), OnFire))
                .forEach(([entity, flammableComponent]) => {
                    (flammableComponent as Flammable).resistance--;
                    if ((flammableComponent as Flammable).resistance <= 0) {
                        this.ecs.addComponent((entity as Entity), new OnFire());
                    }
                })
            ;
        }
    }
}
