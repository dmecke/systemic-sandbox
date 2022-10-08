import Vector from '../Math/Vector';

export default class Canvas {

    constructor(
        private readonly id: string,
        private nativeResolution: Vector,
        private maxScale: number,
    ) {
        window.addEventListener('resize', () => this.resize());
        this.resize();
    }

    resize(): void {
        const canvas = document.getElementById(this.id);
        if (canvas === null) {
            throw new Error('No canvas found.');
        }

        canvas.style.width = this.size.x.toString() + 'px';
        canvas.style.height = this.size.y.toString() + 'px';
    }

    private get size(): Vector {
        for (let i = this.maxScale; i >= 1; i--) {
            if (window.innerWidth >= this.nativeResolution.multiply(i).x) {
                return this.nativeResolution.multiply(i);
            }
        }

        return this.nativeResolution;
    }
}
