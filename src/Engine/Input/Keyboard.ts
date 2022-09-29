import Listener from './Listener';

export default class Keyboard {

    private pressedKeys = new Set<string>();

    private pressedListeners: Listener[] = [];
    private downListeners: Listener[] = [];
    private releasedListeners: Listener[] = [];

    private anyPressedCallbacks: (() => void)[] = [];
    private anyDownCallbacks: (() => void)[] = [];
    private anyReleasedCallbacks: (() => void)[] = [];

    constructor() {
        window.addEventListener('keydown', event => this.onKeyDown(event));
        window.addEventListener('keyup', event => this.onKeyUp(event));
    }

    onPressed(code: string, callback: () => void): void {
        this.pressedListeners.push(new Listener(code, callback));
    }

    onDown(code: string, callback: () => void): void {
        this.downListeners.push(new Listener(code, callback));
    }

    onReleased(code: string, callback: () => void): void {
        this.releasedListeners.push(new Listener(code, callback));
    }

    onPressedOneOf(codes: string[], callback: () => void): void {
        codes.forEach(code => this.pressedListeners.push(new Listener(code, callback)));
    }

    onDownOneOf(codes: string[], callback: () => void): void {
        codes.forEach(code => this.downListeners.push(new Listener(code, callback)));
    }

    onReleasedOneOf(codes: string[], callback: () => void): void {
        codes.forEach(code => this.releasedListeners.push(new Listener(code, callback)));
    }

    onPressedAny(callback: () => void): void {
        this.anyPressedCallbacks.push(callback);
    }

    onDownAny(callback: () => void): void {
        this.anyDownCallbacks.push(callback);
    }

    onReleasedAny(callback: () => void): void {
        this.anyReleasedCallbacks.push(callback);
    }

    private onKeyDown(event: KeyboardEvent): void {
        if (!this.pressedKeys.has(event.code)) {
            this.pressedListeners.forEach(listener => listener.handle(event.code));
            this.anyPressedCallbacks.forEach(callback => callback());
        }
        this.downListeners.forEach(listener => listener.handle(event.code));
        this.anyDownCallbacks.forEach(callback => callback());
        this.pressedKeys.add(event.code);

        Keyboard.preventDefault(event);
    }

    private onKeyUp(event: KeyboardEvent): void {
        this.releasedListeners.forEach(listener => listener.handle(event.code));
        this.anyReleasedCallbacks.forEach(callback => callback());
        this.pressedKeys.delete(event.code);

        Keyboard.preventDefault(event);
    }

    private static preventDefault(event: KeyboardEvent): void {
        if (['Tab', 'Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(event.code) === -1) {
            return;
        }

        event.preventDefault();
    }
}
