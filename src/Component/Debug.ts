import Component from '../Engine/ECS/Component';

export default class Debug extends Component {
    constructor(
        public meta: Record<string, unknown>,
    ) {
        super();
    }

    static fromData(data: { meta: Record<string, unknown> }): Debug {
        return new Debug(data.meta ?? {});
    }
}
