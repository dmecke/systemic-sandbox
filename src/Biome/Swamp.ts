import Biome from './Biome';
import Vector from '@dmecke/game-engine/lib/Math/Vector';

export default class Swamp implements Biome {
    color = '#337755';
    image = 'swamp';
    treeR = 3;
    treeOffset = new Vector(22, 42);
    grassChance = 30;
}
