import Component from '../Engine/ECS/Component';

export default class Flammable extends Component {

    constructor(
        readonly resistance: number,
    ) {
        super();
    }

    static fromData(data: { resistance: number }): Flammable {
        return new Flammable(data.resistance ?? 100);
    }
}
