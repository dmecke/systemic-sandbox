import Biome from './Biome';
import Vector from '../Engine/Math/Vector';

export default class Water implements Biome {
    color = '#4060c0';
    image = 'water';
    treeR = -1;
    treeOffset = new Vector(0, 0);
    grassChance = 0;
}
