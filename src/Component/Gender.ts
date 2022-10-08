import Component from '../Engine/ECS/Component';
import Rng from '../Engine/Math/Rng';

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
        return new Gender(Rng.getInstance(window.seed.toString()).choose(['male', 'female']));
    }

    static fromData(data: { gender: 'male'|'female' }): Gender {
        return new Gender(data.gender);
    }
}
