import Component from '../Engine/ECS/Component';

export default class Animal extends Component {
    constructor(
        public type: string,
    ) {
        super();
    }

    static fromData(data: { type: string }): Animal {
        return new Animal(data.type);
    }
}
