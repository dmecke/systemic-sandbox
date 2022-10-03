import Mouse from '../Engine/Input/Mouse';
import Vector from '../Engine/Math/Vector';

export default class Input {

    private static instance = new Input();

    private mouse = new Mouse();

    public static getInstance(): Input {
        return this.instance;
    }

    onActionPressed(callback: (position: Vector) => void): void {
        this.mouse.onClicked(0, position => callback(position));
    }
}
