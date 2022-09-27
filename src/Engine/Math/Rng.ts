// eslint-disable-next-line @typescript-eslint/no-var-requires
const seedrandom = require('seedrandom');

export default class Rng {

    private static instance: Rng|null = null;

    private readonly rng: CallableFunction;

    static getInstance(seed: string): Rng {
        if (Rng.instance === null) {
            Rng.instance = new Rng(seed);
        }

        return Rng.instance;
    }

    private constructor(seed: string) {
        this.rng = seedrandom(seed);
    }

    random(max: number): number {
        return Math.floor(this.rng() * max);
    }

    chance(amount: number): boolean {
        return amount > this.random(100);
    }

    choose<T>(array: T[]): T {
        return array[this.random(array.length)];
    }
}
