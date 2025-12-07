/**
 * A seeded random number generator.
 */
export declare class RNG {
    private seed;
    constructor(seed: number | string);
    private stringToSeed;
    setSeed(seed: number | string): void;
    next(): number;
    int(min: number, max: number): number;
    bellFloat(min: number, max: number): number;
    float(min: number, max: number): number;
    item<T>(items: T[]): T;
    randomSet<T>(itemCount: number, items: T[]): T[];
    randomString(length: number): string;
    shuffle<T>(items: T[]): T[];
    weighted<T extends {
        commonality: number;
    }>(items: T[]): T;
}
