import Component from '../Engine/ECS/Component';

export default class Health extends Component {

    constructor(
        public health: number,
    ) {
        super();
    }

    static fromData(data: { health: number }): Health {
        return new Health(data.health ?? 250);
    }
}
