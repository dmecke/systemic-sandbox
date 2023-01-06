import MouseListener from './MouseListener';
import Vector from '@dmecke/game-engine/lib/Math/Vector';

export default class Mouse {

    private clickedButtons = new Set<number>();

    private clickedListeners: MouseListener[] = [];
    private downListeners: MouseListener[] = [];
    private releasedListeners: MouseListener[] = [];

    private anyClickedCallbacks: (() => void)[] = [];
    private anyDownCallbacks: (() => void)[] = [];
    private anyReleasedCallbacks: (() => void)[] = [];

    constructor() {
        window.addEventListener('mousedown', event => this.onMouseDown(event));
        window.addEventListener('mouseup', event => this.onMouseUp(event));
    }

    onClicked(button: number, callback: (position: Vector) => void): void {
        this.clickedListeners.push(new MouseListener(button, callback));
    }

    onDown(button: number, callback: () => void): void {
        this.downListeners.push(new MouseListener(button, callback));
    }

    onReleased(number: number, callback: () => void): void {
        this.releasedListeners.push(new MouseListener(number, callback));
    }

    onClickedOneOf(buttons: number[], callback: () => void): void {
        buttons.forEach(code => this.clickedListeners.push(new MouseListener(code, callback)));
    }

    onDownOneOf(buttons: number[], callback: () => void): void {
        buttons.forEach(code => this.downListeners.push(new MouseListener(code, callback)));
    }

    onReleasedOneOf(buttons: number[], callback: () => void): void {
        buttons.forEach(code => this.releasedListeners.push(new MouseListener(code, callback)));
    }

    onClickedAny(callback: () => void): void {
        this.anyClickedCallbacks.push(callback);
    }

    onDownAny(callback: () => void): void {
        this.anyDownCallbacks.push(callback);
    }

    onReleasedAny(callback: () => void): void {
        this.anyReleasedCallbacks.push(callback);
    }

    private onMouseDown(event: MouseEvent): void {
        const position = new Vector(
            event.clientX - window.canvas.getBoundingClientRect().left,
            event.clientY - window.canvas.getBoundingClientRect().top,
        ).floor();
        if (!this.clickedButtons.has(event.button)) {
            this.clickedListeners.forEach(listener => listener.handle(event.button, position));
            this.anyClickedCallbacks.forEach(callback => callback());
        }
        this.downListeners.forEach(listener => listener.handle(event.button, position));
        this.anyDownCallbacks.forEach(callback => callback());
        this.clickedButtons.add(event.button);

        event.preventDefault();
    }

    private onMouseUp(event: MouseEvent): void {
        const position = new Vector(
            event.clientX - window.canvas.getBoundingClientRect().left,
            event.clientY - window.canvas.getBoundingClientRect().top,
        ).floor();
        this.releasedListeners.forEach(listener => listener.handle(event.button, position));
        this.anyReleasedCallbacks.forEach(callback => callback());
        this.clickedButtons.delete(event.button);

        event.preventDefault();
    }
}
