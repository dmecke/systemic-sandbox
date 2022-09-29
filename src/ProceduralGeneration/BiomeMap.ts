import Biome from '../Biome/Biome';
import Vector from '../Engine/Math/Vector';

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

    all(): { position: Vector, biome: Biome }[] {
        return Array.from(this.map.entries()).map(entry => {
            const position = entry[0].split('|');

            return { position: new Vector(position[0], position[1]), biome: entry[1]};
        });
    }
}
