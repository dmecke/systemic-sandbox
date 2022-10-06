import Component from '../Engine/ECS/Component';

export default class ReproductionUrge extends Component {

    constructor(
        public urge = 0,
    ) {
        super();
    }

    static fromData(): ReproductionUrge {
        return new ReproductionUrge();
    }
}
