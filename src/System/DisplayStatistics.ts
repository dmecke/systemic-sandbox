import Font from '../Engine/Font/Font';
import Food from '../Component/Food';
import MatchupPro12 from '../assets/fonts/MatchupPro12';
import Plant from '../Component/Plant';
import Query from '../Engine/ECS/Query';
import Sheep from '../Component/Sheep';
import System from '../Engine/ECS/System';
import Vector from '../Engine/Math/Vector';
import Wolf from '../Component/Wolf';

export default class DisplayStatistics extends System {
    private offset = 0;

    update(query: Query): void {
        this.offset = 0;

        this.draw(`Wolves: ${query.allComponents(Wolf).length}`);
        this.draw(`Sheep: ${query.allComponents(Sheep).length}`);
        this.draw(`Grass: ${query.allComponents(Food, Plant).length}`);
    }

    private draw(text: string): void {
        new Font(new MatchupPro12()).alignLeft().at(new Vector(4, this.offset)).draw(text);
        this.offset += 10;
    }
}
