import Vector from '@dmecke/game-engine/lib/Math/Vector';

export default interface Biome {
    color: string;
    image: string;
    treeR: number;
    treeOffset: Vector,
    grassChance: number;
}
