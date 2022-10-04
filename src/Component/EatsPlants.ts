import Component from '../Engine/ECS/Component';

export default class EatsPlants extends Component {
    static fromData(): EatsPlants {
        return new EatsPlants();
    }
}
