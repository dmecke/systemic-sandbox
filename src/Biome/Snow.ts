import Biome from './Biome';
import Vector from '../Engine/Math/Vector';

export default class Snow implements Biome {
    color = '#ffffff';
    image = 'snow';
    treeR = 4;
    treeOffset = new Vector(20, 36);
    grassChance = 10;
}
