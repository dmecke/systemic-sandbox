import Component from '../Engine/ECS/Component';

export default class CanMove extends Component {

    constructor(
        public maxSpeed: number,
    ) {
        if (!maxSpeed) {
            throw new Error('CanMove has no maxSpeed set.');
        }
        super();
    }

    static fromData(data: { maxSpeed: number }): CanMove {
        return new CanMove(data.maxSpeed);
    }
}
