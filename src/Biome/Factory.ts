import Biome from './Biome';
import Desert from './Desert';
import Grassland from './Grassland';
import Jungle from './Jungle';
import Swamp from './Swamp';
import Water from './Water';

const seaLevel = 0.2;
const swampLevel = 0.3;

export default function(elevation: number, moisture: number): Biome {
    if (elevation <= seaLevel) return new Water();

    if (elevation <= swampLevel && moisture > 0.75) {
        return new Swamp();
    }

    if (moisture <= 0.25) return new Desert();
    if (moisture >= 0.75) return new Jungle();

    return new Grassland();
}
