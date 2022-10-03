import Component from '../Engine/ECS/Component';

export default class RandomMovement extends Component {

    static fromData(): RandomMovement {
        return new RandomMovement();
    }
}
