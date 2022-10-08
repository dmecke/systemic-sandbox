import Entity from '../Engine/ECS/Entity';
import Position from '../Component/Position';
import QuadTree from '../Engine/Type/QuadTree';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';

export default class UpdateQuadTree extends System {
    constructor(
        private quadTree: QuadTree<Entity>,
    ) {
        super();
    }

    update(query: Query): void {
        this.quadTree.clear();
        for (const [entity, position] of query.allEntities(Position)) {
            this.quadTree.insert({ position: position.position, data: entity });
        }
    }
}
