import Biome from './Biome';
import Vector from '../Engine/Math/Vector';

export default class Jungle implements Biome {
    color = '#6a836a';
    image = 'jungle';
    treeR = 1;
    treeOffset = new Vector(24, 52);
}
