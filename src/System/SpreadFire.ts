import Flammable from '../Component/Flammable';
import OnFire from '../Component/OnFire';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import Rng from '../Engine/Math/Rng';
import System from '../Engine/ECS/System';
import config from '../assets/config.json';

export default class SpreadFire extends System {

    // eslint-disable-next-line @typescript-eslint/ban-types
    componentsRequired = new Set<Function>([Position, OnFire]);

    update(query: Query): void {
        const onFire = query.allComponents(Position, OnFire);
        if (onFire.length === 0) {
            return;
        }

        const flammable = query
            .allEntities(Position, Flammable)
            .filter(([entity]) => !query.hasComponent(entity, OnFire))
        ;

        for (const [onFirePositionComponent] of onFire) {
            flammable
                .filter(([, flammablePositionComponent]) => onFirePositionComponent.position.distanceTo(flammablePositionComponent.position) <= config.systems.fireSpreadDistance)
                .filter(([entity]) => !this.ecs.query.hasComponent(entity, OnFire))
                .forEach(([entity, , flammableComponent]) => {
                    if (Rng.getInstance(window.seed.toString()).chance(50)) {
                        flammableComponent.resistance--;
                    }
                    if (flammableComponent.resistance <= 0) {
                        this.ecs.addComponent(entity, new OnFire());
                    }
                })
            ;
        }
    }
}
