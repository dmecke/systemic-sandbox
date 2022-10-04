import Component from '../Engine/ECS/Component';

export default class Meat extends Component {
    static fromData(): Meat {
        return new Meat();
    }
}
