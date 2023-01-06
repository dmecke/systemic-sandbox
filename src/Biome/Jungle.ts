import Biome from './Biome';
import Vector from '@dmecke/game-engine/lib/Math/Vector';

export default class Jungle implements Biome {
    color = '#6a836a';
    image = 'jungle';
    treeR = 1;
    treeOffset = new Vector(24, 52);
    grassChance = 20;
}
