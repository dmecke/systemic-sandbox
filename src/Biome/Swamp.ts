import Biome from './Biome';
import Vector from '../Engine/Math/Vector';

export default class Swamp implements Biome {
    color = '#337755';
    image = 'swamp';
    treeR = 3;
    treeOffset = new Vector(22, 42);
}
