import Component from '../Engine/ECS/Component';

export default class Wolf extends Component {
    static fromData(): Wolf {
        return new Wolf();
    }
}
