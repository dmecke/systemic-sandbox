import Component from '../Engine/ECS/Component';

export default class GroundLayerComponent extends Component {

    constructor(
        readonly heightMap: number[][],
        readonly moistureMap: number[][],
        readonly offset: number[][],
    ) {
        super();
    }
}
