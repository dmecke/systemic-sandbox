import TreeMap from '../ProceduralGeneration/TreeMap';
import config from '../assets/config.json';

export default class TreeMapRenderer {
    constructor(
        private readonly treeMap: TreeMap,
        private readonly context: CanvasRenderingContext2D,
    ) {
    }

    render(): void {
        const size = config.generation.size;
        for (let y = 0; y < size.y; y++) {
            for (let x = 0; x < size.x; x++) {
                const color = this.treeMap.get(x, y) ? 255 : 0;
                this.context.fillStyle = `rgb(${color}, ${color}, ${color})`;
                this.context.fillRect(x, y, 1, 1);
            }
        }
    }
}
