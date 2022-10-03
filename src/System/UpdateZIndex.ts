import InViewport from '../Component/InViewport';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import Sprite from '../Component/Sprite';
import System from '../Engine/ECS/System';

export default class UpdateZIndex extends System {
    update(query: Query): void {
        for (const [positionComponent, spriteComponent] of query.allComponents(Position, Sprite, InViewport)) {
            spriteComponent.zIndex = -positionComponent.position.y;
        }
    }
}
