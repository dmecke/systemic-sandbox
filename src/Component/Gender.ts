import Component from '../Engine/ECS/Component';
import Rng from '@dmecke/game-engine/lib/Math/Rng';

export default class Gender extends Component {

    constructor(
        public gender: 'male'|'female',
    ) {
        super();
    }

    equals(other: Gender): boolean {
        return this.gender === other.gender;
    }

    static random(): Gender {
        return new Gender(Rng.instance.choose(['male', 'female']));
    }

    static fromData(data: { gender: 'male'|'female' }): Gender {
        return new Gender(data.gender);
    }
}
