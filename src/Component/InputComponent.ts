import Component from '../Engine/ECS/Component';
import Input from '../Input/Input';

export default class InputComponent extends Component {

    input = Input.getInstance();

    static fromData(): InputComponent {
        return new InputComponent();
    }
}
