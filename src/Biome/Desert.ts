import Biome from './Biome';
import Vector from '../Engine/Math/Vector';

export default class Desert implements Biome {
    color = '#eac28a';
    image = 'desert';
    treeR = 6;
    treeOffset = new Vector(4, 8);
    grassChance = 1;
}
