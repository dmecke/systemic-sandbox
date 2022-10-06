import BiomeComponent from '../../Component/BiomeComponent';
import BiomeMap from '../../ProceduralGeneration/BiomeMap';
import Entity from '../../Engine/ECS/Entity';
import EntityFactory from '../../Engine/ECS/EntityFactory';
import ImageLoader from '../../Engine/Assets/ImageLoader';
import Vector from '../../Engine/Math/Vector';
import VectorMap from '../../ProceduralGeneration/VectorMap';
import config from '../../assets/config.json';

export default class GroundFactory {
    constructor(
        private readonly entityFactory: EntityFactory,
        private readonly biomeMap: BiomeMap,
    ) {
    }

    create(): Entity {
        return this.entityFactory.create('ground', [
            this.createGroundLayerComponent(),
        ]);
    }

    private createGroundLayerComponent(): BiomeComponent {
        const size = config.generation.size;
        const spriteOffsets = new VectorMap();
        for (let y = 0; y < size.y; y++) {
            for (let x = 0; x < size.x; x++) {
                spriteOffsets.set(x, y, this.getSpriteOffset(new Vector(x, y), this.biomeMap.get(x, y).constructor.name, 'Grassland'));
            }
        }

        return new BiomeComponent(this.biomeMap, spriteOffsets);
    }

    private getSpriteOffset(position: Vector, base: string, adja: string): Vector {
        if (base !== 'Grassland') {
            // top left corner
            if (this.check(position, [
                [adja, adja, null],
                [adja, base, base],
                [null, base, base],
            ])) {
                return new Vector(0, 1);
            }

            // top right corner
            if (this.check(position, [
                [null, adja, adja],
                [base, base, adja],
                [base, base, null],
            ])) {
                return new Vector(2, 1);
            }

            // bottom left corner
            if (this.check(position, [
                [null, base, base],
                [adja, base, base],
                [adja, adja, null],
            ])) {
                return new Vector(0, 3);
            }

            // bottom right corner
            if (this.check(position, [
                [base, base, null],
                [base, base, adja],
                [null, adja, adja],
            ])) {
                return new Vector(2, 3);
            }

            // top left bottom right tip
            if (this.check(position, [
                [adja, base, null],
                [base, base, base],
                [null, base, adja],
            ])) {
                return new Vector(2, 4);
            }

            // top right bottom left tip
            if (this.check(position, [
                [null, base, adja],
                [base, base, base],
                [adja, base, null],
            ])) {
                return new Vector(2, 5);
            }

            // top left tip
            if (this.check(position, [
                [adja, base, null],
                [base, base, null],
                [null, null, null],
            ])) {
                return new Vector(0, 4);
            }

            // top right tip
            if (this.check(position, [
                [null, base, adja],
                [null, base, base],
                [null, null, null],
            ])) {
                return new Vector(1, 4);
            }

            // bottom left tip
            if (this.check(position, [
                [null, null, null],
                [base, base, null],
                [adja, base, null],
            ])) {
                return new Vector(0, 5);
            }

            // bottom right tip
            if (this.check(position, [
                [null, null, null],
                [null, base, base],
                [null, base, adja],
            ])) {
                return new Vector(1, 5);
            }

            // top edge
            if (this.check(position, [
                [null, adja, null],
                [base, base, base],
                [null, base, null],
            ])) {
                return new Vector(1, 1);
            }

            // bottom edge
            if (this.check(position, [
                [null, base, null],
                [base, base, base],
                [null, adja, null],
            ])) {
                return new Vector(1, 3);
            }

            // left edge
            if (this.check(position, [
                [null, base, null],
                [adja, base, base],
                [null, base, null],
            ])) {
                return new Vector(0, 2);
            }

            // right edge
            if (this.check(position, [
                [null, base, null],
                [base, base, adja],
                [null, base, null],
            ])) {
                return new Vector(2, 2);
            }
        }

        const biome = this.biomeMap.get(position.x, position.y);
        const img = ImageLoader.instance.getImage(`tiles/${biome.image}`);
        return new Vector(
            Math.floor(Math.random() * (img.width as number) / config.tileSize),
            0,
        );
    }

    private check(position: Vector, rules: (string|null)[][]): boolean {
        for (let y = 0; y <= 2; y++) {
            for (let x = 0; x <= 2; x++) {
                const biome = this.biomeMap.get(position.x + x - 1, position.y + y - 1);
                if (rules[y][x] !== null && !((biome ? biome.constructor.name : null) === rules[y][x])) {
                    return false;
                }
            }
        }

        return true;
    }
}
