import Gamepad from './Gamepad';
import Vector from '@dmecke/game-engine/lib/Math/Vector';

export default class Gamepads {

    private gamepads = new Map<number, Gamepad>();

    private pressedListeners: { code: string, callback: () => void }[] = [];
    private downListeners: { code: string, callback: () => void }[] = [];
    private releasedListeners: { code: string, callback: () => void }[] = [];

    constructor() {
        window.addEventListener('gamepadconnected', event => this.onGamepadConnected(event));
        window.addEventListener('gamepaddisconnected', event => this.onGamepadDisconnected(event));
    }

    onPressed(code: string, callback: () => void): void {
        this.pressedListeners.push({ code, callback });
        this.gamepads.forEach(gamepad => gamepad.onPressed(code, callback));
    }

    onDown(code: string, callback: () => void): void {
        this.downListeners.push({ code, callback });
        this.gamepads.forEach(gamepad => gamepad.onDown(code, callback));
    }

    onReleased(code: string, callback: () => void): void {
        this.releasedListeners.push({ code, callback });
        this.gamepads.forEach(gamepad => gamepad.onReleased(code, callback));
    }

    onPressedOneOf(codes: string[], callback: () => void): void {
        codes.forEach(code => {
            this.pressedListeners.push({code, callback});
            this.gamepads.forEach(gamepad => gamepad.onPressed(code, callback));
        });
    }

    onDownOneOf(codes: string[], callback: () => void): void {
        codes.forEach(code => {
            this.downListeners.push({code, callback});
            this.gamepads.forEach(gamepad => gamepad.onDown(code, callback));
        });
    }

    onReleasedOneOf(codes: string[], callback: () => void): void {
        codes.forEach(code => {
            this.releasedListeners.push({code, callback});
            this.gamepads.forEach(gamepad => gamepad.onReleased(code, callback));
        });
    }

    getAnalog(index: number): Vector {
        let analog = Vector.null();
        this.gamepads.forEach(gamepad => analog = analog.add(gamepad.getAnalog(index)));
        if (analog.length > 1) {
            analog = analog.normalize();
        }

        return analog;
    }

    rumble(duration: number): void {
        this.gamepads.forEach(gamepad => gamepad.rumble(duration));
    }

    private onGamepadConnected(event: GamepadEvent): void {
        const gamepad = new Gamepad(event.gamepad.index);
        this.gamepads.set(event.gamepad.index, gamepad);

        this.pressedListeners.forEach(listener => gamepad.onPressed(listener.code, listener.callback));
        this.downListeners.forEach(listener => gamepad.onDown(listener.code, listener.callback));
        this.releasedListeners.forEach(listener => gamepad.onReleased(listener.code, listener.callback));
    }

    private onGamepadDisconnected(event: GamepadEvent): void {
        this.gamepads.get(event.gamepad.index).disconnect();
        this.gamepads.delete(event.gamepad.index);
    }
}
