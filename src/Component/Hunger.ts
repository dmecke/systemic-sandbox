import Component from '../Engine/ECS/Component';

export default class Hunger extends Component {

    constructor(
        public hunger: number,
    ) {
        super();
    }

    static fromData(data: { hunger: number }): Hunger {
        return new Hunger(data.hunger ?? 0);
    }
}
