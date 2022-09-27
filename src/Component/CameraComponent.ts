import Component from '../Engine/ECS/Component';

export default class CameraComponent extends Component {

    static fromData(): CameraComponent {
        return new CameraComponent();
    }
}
