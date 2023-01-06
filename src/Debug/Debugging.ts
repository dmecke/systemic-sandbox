import Debug from '@dmecke/game-engine/lib/Debug/Debug';

export default class Debugging {

    private readonly debug = new Debug();

    get showFps(): boolean {
        return this.debug.get('showFps') as boolean;
    }

    set showFps(value: boolean) {
        this.debug.set('showFps', value);
    }
}
