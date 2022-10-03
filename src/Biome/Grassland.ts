import Biome from './Biome';
import Vector from '../Engine/Math/Vector';

export default class Grassland implements Biome {
    color = '#88aa55';
    image = 'grassland';
    treeR = 2;
    treeOffset = new Vector(14, 27);
}
