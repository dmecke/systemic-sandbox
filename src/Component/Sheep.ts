import Component from '../Engine/ECS/Component';

export default class Sheep extends Component {
    static fromData(): Sheep {
        return new Sheep();
    }
}
