import Component from '../Engine/ECS/Component';

export default class OnFire extends Component {

    static fromData(): OnFire {
        return new OnFire();
    }
}
