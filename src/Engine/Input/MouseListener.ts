import Vector from '../Math/Vector';

export default class MouseListener {

    constructor(
        private code: number,
        private callback: (position: Vector) => void,
    ) {
    }

    handle(code: number, position: Vector): void {
        if (code !== this.code) {
            return;
        }

        this.callback(position);
    }
}
