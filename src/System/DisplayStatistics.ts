import Animal from '../Component/Animal';
import Font from '../Engine/Font/Font';
import Food from '../Component/Food';
import MatchupPro12 from '../assets/fonts/MatchupPro12';
import Plant from '../Component/Plant';
import Query from '../Engine/ECS/Query';
import System from '../Engine/ECS/System';
import Vector from '@dmecke/game-engine/lib/Math/Vector';

export default class DisplayStatistics extends System {
    private offset = 0;

    update(query: Query): void {
        this.offset = 0;

        this.draw(`Grass: ${query.allComponents(Food, Plant).length}`);

        const animals = {};
        query.allComponents(Animal).forEach(([animal]) => animals[animal.type] = animals[animal.type] + 1 || 1);
        Object.keys(animals).forEach(animal => this.draw(`${animal}: ${animals[animal]}`));
    }

    private draw(text: string): void {
        new Font(new MatchupPro12()).alignLeft().at(new Vector(4, this.offset)).draw(text);
        this.offset += 10;
    }
}
