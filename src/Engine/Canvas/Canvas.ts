export default class Canvas {

    constructor(
        private readonly id: string,
    ) {
        window.addEventListener('resize', () => this.resize());
        this.resize();
    }

    resize(): void {
        const canvas = document.getElementById(this.id);
        if (canvas === null) {
            throw new Error('No canvas found.');
        }

        const size = this.getSize();
        canvas.style.width = size[0].toString() + 'px';
        canvas.style.height = size[1].toString() + 'px';
    }

    private getSize(): number[] {
        if (window.innerWidth >= 1280) {
            return [1280, 720];
        }

        if (window.innerWidth >= 640) {
            return [640, 360];
        }

        return [320, 180];
    }
}
