import Animation from '../Component/Animation';
import CanMove from '../Component/CanMove';
import MovementTarget from '../Component/MovementTarget';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';

export default class MovementAnimationUpdater extends System {
    update(query: Query): void {
        for (const [entity, animation] of query.allEntities(Animation, CanMove)) {
            const isMoving = this.ecs.query.hasComponent(entity, MovementTarget);
            animation.animation = isMoving ? 'walk' : 'idle';
        }
    }
}
