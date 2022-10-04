import Component from '../Engine/ECS/Component';

export default class Animation extends Component {
    _animation: string;
    timer = 0;

    constructor(
        public animations: Record<string, { frames: number, frameDuration: number }>,
    ) {
        super();
        this._animation = Object.keys(animations)[0];
    }

    static fromData(data: { animations: Record<string, { frames: number, frameDuration: number }> }): Animation {
        for (const key in data.animations) {
            if (!data.animations[key].frames) {
                throw new Error(`Animation ${key} must have "frames" set.`);
            }

            if (!data.animations[key].frameDuration) {
                throw new Error(`Animation ${key} must have "frameDuration" set.`);
            }
        }

        return new Animation(data.animations);
    }

    get index(): number {
        return Math.floor(this.timer / this.animations[this._animation].frameDuration) % this.animations[this._animation].frames;
    }

    get row(): number {
        return Object.keys(this.animations).indexOf(this._animation) * 4;
    }

    set animation(animation: string) {
        if (this._animation === animation) {
            return;
        }

        this._animation = animation;
        this.timer = 0;
    }
}
