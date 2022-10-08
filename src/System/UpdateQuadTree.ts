import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';

export default class UpdateQuadTree extends System {
    update(query: Query): void {
        this.ecs.quadTree.clear();
        for (const [entity, position] of query.allEntities(Position)) {
            this.ecs.quadTree.insert({ position: position.position, data: entity });
        }
    }
}
