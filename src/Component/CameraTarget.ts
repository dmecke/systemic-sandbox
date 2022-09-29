import Component from '../Engine/ECS/Component';

export default class CameraTarget extends Component {

    static fromData(): CameraTarget {
        return new CameraTarget();
    }
}
