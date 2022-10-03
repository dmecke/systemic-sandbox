import Component from '../Engine/ECS/Component';

export default class Interactable extends Component {

    static fromData(): Interactable {
        return new Interactable();
    }
}
