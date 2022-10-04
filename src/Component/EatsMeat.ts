import Component from '../Engine/ECS/Component';

export default class EatsMeat extends Component {
    static fromData(): EatsMeat {
        return new EatsMeat();
    }
}
