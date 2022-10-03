import IsInViewport from '../Component/IsInViewport';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import Sprite from '../Component/Sprite';
import System from '../Engine/ECS/System';

export default class UpdateZIndex extends System {

    // eslint-disable-next-line @typescript-eslint/ban-types
    componentsRequired = new Set<Function>([Position, Sprite, IsInViewport]);

    update(query: Query): void {
        query
            .all()
            .forEach(components => components.get(Sprite).zIndex = -components.get(Position).position.y)
        ;
    }
}
