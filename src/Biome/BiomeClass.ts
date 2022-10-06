import Biome from './Biome';

type BiomeClass<T extends Biome> = new (...args: unknown[]) => T;

export default BiomeClass;
