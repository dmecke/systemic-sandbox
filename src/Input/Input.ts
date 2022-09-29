import Gamepads from '../Engine/Input/Gamepads';
import Keyboard from '../Engine/Input/Keyboard';
import Vector from '../Engine/Math/Vector';
import Xbox360Controller from '../Engine/Input/Mapping/Xbox360Controller';
import config from '../assets/config.json';

export default class Input {

    private static instance = new Input();

    private keyboard = new Keyboard();
    private gamepads = new Gamepads();

    private keyboardButtons = {
        right: false,
        left: false,
        up: false,
        down: false,
        action: false,
    }

    private gamepadButtons = {
        right: false,
        left: false,
        up: false,
        down: false,
        action: false,
    }

    private constructor() {
        this.keyboard.onPressedOneOf(['ArrowRight', 'KeyD'], () => this.keyboardButtons.right = true);
        this.keyboard.onPressedOneOf(['ArrowLeft', 'KeyA'], () => this.keyboardButtons.left = true);
        this.keyboard.onPressedOneOf(['ArrowUp', 'KeyW'], () => this.keyboardButtons.up = true);
        this.keyboard.onPressedOneOf(['ArrowDown', 'KeyS'], () => this.keyboardButtons.down = true);
        this.keyboard.onReleasedOneOf(['ArrowRight', 'KeyD'], () => this.keyboardButtons.right = false);
        this.keyboard.onReleasedOneOf(['ArrowLeft', 'KeyA'], () => this.keyboardButtons.left = false);
        this.keyboard.onReleasedOneOf(['ArrowUp', 'KeyW'], () => this.keyboardButtons.up = false);
        this.keyboard.onReleasedOneOf(['ArrowDown', 'KeyS'], () => this.keyboardButtons.down = false);

        this.gamepads.onPressed(Xbox360Controller.DPAD_RIGHT, () => this.keyboardButtons.right = true);
        this.gamepads.onPressed(Xbox360Controller.DPAD_LEFT, () => this.keyboardButtons.left = true);
        this.gamepads.onPressed(Xbox360Controller.DPAD_UP, () => this.keyboardButtons.up = true);
        this.gamepads.onPressed(Xbox360Controller.DPAD_DOWN, () => this.keyboardButtons.down = true);
        this.gamepads.onReleased(Xbox360Controller.DPAD_RIGHT, () => this.keyboardButtons.right = false);
        this.gamepads.onReleased(Xbox360Controller.DPAD_LEFT, () => this.keyboardButtons.left = false);
        this.gamepads.onReleased(Xbox360Controller.DPAD_UP, () => this.keyboardButtons.up = false);
        this.gamepads.onReleased(Xbox360Controller.DPAD_DOWN, () => this.keyboardButtons.down = false);
    }

    public static getInstance(): Input {
        return this.instance;
    }

    private get horizontal(): number {
        const gamepad0 = this.gamepads.getAnalog(0).x;
        const gamepad1 = this.gamepads.getAnalog(1).x;

        return (this.keyboardButtons.right ? 1 : 0) +
            (this.gamepadButtons.right ? 1 : 0) -
            (this.keyboardButtons.left ? 1 : 0) -
            (this.gamepadButtons.left ? 1 : 0) +
            (Math.abs(gamepad0) > config.controls.gamepadThreshold ? gamepad0 : 0) +
            (Math.abs(gamepad1) > config.controls.gamepadThreshold ? gamepad1 : 0)
        ;
    }

    private get vertical(): number {
        const gamepad0 = this.gamepads.getAnalog(0).y;
        const gamepad1 = this.gamepads.getAnalog(1).y;

        return (this.keyboardButtons.down ? 1 : 0) +
            (this.gamepadButtons.down ? 1 : 0) -
            (this.keyboardButtons.up ? 1 : 0) -
            (this.gamepadButtons.up ? 1 : 0) +
            (Math.abs(gamepad0) > config.controls.gamepadThreshold ? gamepad0 : 0) +
            (Math.abs(gamepad1) > config.controls.gamepadThreshold ? gamepad1 : 0)
        ;
    }

    public getDirectionVector(): Vector {
        return new Vector(
            this.horizontal,
            this.vertical,
        ).normalize();
    }

    onActionPressed(callback: () => void): void {
        this.keyboard.onPressedOneOf(['Space', 'Enter', 'NumpadEnter'], () => callback());
        this.gamepads.onPressed(Xbox360Controller.A, () => callback());
    }
}
