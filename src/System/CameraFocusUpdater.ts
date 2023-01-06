import CameraComponent from '../Component/CameraComponent';
import CameraTarget from '../Component/CameraTarget';
import Focus from '../Component/Focus';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';
import Vector from '@dmecke/game-engine/lib/Math/Vector';

export default class CameraFocusUpdater extends System {
    update(query: Query): void {
        let target = new Vector(0, 0);
        for (const [position] of query.allComponents(Position, CameraTarget)) {
            target = target.add(position.position);
        }

        for (const [focusComponent] of query.allComponents(Focus, CameraComponent)) {
            focusComponent.position = target.divide(query.allComponents(Position, CameraTarget).length);
        }
    }
}
