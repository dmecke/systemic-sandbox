import Component from '../Engine/ECS/Component';

export default class Plant extends Component {
    static fromData(): Plant {
        return new Plant();
    }
}
