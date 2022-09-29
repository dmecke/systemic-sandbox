import InputComponent from '../Component/InputComponent';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';

export default class InputEvaluator extends System {

    // eslint-disable-next-line @typescript-eslint/ban-types
    componentsRequired = new Set<Function>([InputComponent, Position]);

    update(query: Query): void {
        const components = query.one();
        const input = components.get(InputComponent).input;
        const positionComponent = components.get(Position);

        positionComponent.position = positionComponent.position.add(input.getDirectionVector());
        positionComponent.position = positionComponent.position.round();
    }
}
