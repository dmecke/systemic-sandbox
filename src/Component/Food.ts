import Component from '../Engine/ECS/Component';

export default class Food extends Component {
    static fromData(): Food {
        return new Food();
    }
}
