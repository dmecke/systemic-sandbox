import Component from '../Engine/ECS/Component';

export default class RandomMovement extends Component {

    constructor(
        public range: number,
    ) {
        super();
    }

    static fromData(data: { range: number }): RandomMovement {
        if (!data.range) {
            throw new Error('RandomMovement must have a range assigned.');
        }

        return new RandomMovement(data.range);
    }
}
