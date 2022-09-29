import Component from '../Engine/ECS/Component';

export default class Player extends Component {

    static fromData(): Player {
        return new Player();
    }
}
