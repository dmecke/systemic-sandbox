import Component from '../Engine/ECS/Component';

export default class Flammable extends Component {

    constructor(
        public resistance: number,
    ) {
        super();
    }

    static fromData(data: { resistance: number }): Flammable {
        return new Flammable(data.resistance ?? 100);
    }
}
