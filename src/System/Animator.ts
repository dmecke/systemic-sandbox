import Animation from '../Component/Animation';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';

export default class Animator extends System {
    update(query: Query): void {
        for (const [animation] of query.allComponents(Animation)) {
            animation.timer++;
        }
    }
}
