import Biome from '../Biome/Biome';

export default class BiomeMap {
    private map = new Map();

    set(x: number, y: number, biome: Biome): void {
        this.map.set(`${x}|${y}`, biome);
    }

    get(x: number, y: number): Biome {
        return this.map.get(`${x}|${y}`);
    }

    has(x: number, y: number): boolean {
        return this.map.has(`${x}|${y}`);
    }
}
