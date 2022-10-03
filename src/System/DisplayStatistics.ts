import Font from '../Engine/Font/Font';
import Food from '../Component/Food';
import MatchupPro12 from '../assets/fonts/MatchupPro12';
import Plant from '../Component/Plant';
import Query from '../Engine/ECS/Query';
import Sheep from '../Component/Sheep';
import System from '../Engine/ECS/System';
import Vector from '../Engine/Math/Vector';

export default class DisplayStatistics extends System {
    update(query: Query): void {
        new Font(new MatchupPro12()).alignLeft().at(new Vector(4, 0)).draw(`Sheep: ${query.allComponents(Sheep).length}`);
        new Font(new MatchupPro12()).alignLeft().at(new Vector(4, 10)).draw(`Grass: ${query.allComponents(Food, Plant).length}`);
    }
}
