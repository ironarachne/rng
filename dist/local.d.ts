import type { WeightedEntry } from "./types.js";
/**
 * A seeded random number generator.
 */
export declare class RNG {
    private seed;
    /**
     * Creates a new RNG instance.
     * @param seed The seed to use. Can be a number or a string.
     */
    constructor(seed: number | string);
    private stringToSeed;
    /**
     * Sets the seed for the random number generator.
     * @param seed The seed to use. Can be a number or a string.
     */
    setSeed(seed: number | string): void;
    /**
     * Generates the next random number in the sequence.
     * @returns A random number between 0 and 1.
     */
    next(): number;
    /**
     * Returns a random integer between min and max (inclusive).
     * @param min The minimum value.
     * @param max The maximum value.
     * @returns A random integer between min and max.
     */
    int(min: number, max: number): number;
    /**
     * Returns a random float between min and max, with a bell curve distribution.
     * @param min The minimum value.
     * @param max The maximum value.
     * @returns A random float between min and max.
     */
    bellFloat(min: number, max: number): number;
    /**
     * Returns a random float between min and max.
     * @param min The minimum value.
     * @param max The maximum value.
     * @returns A random float between min and max.
     */
    float(min: number, max: number): number;
    /**
     * Returns a random item from an array.
     * @param items The array of items.
     * @returns A random item from the array.
     */
    item<T>(items: T[]): T;
    /**
     * Returns a random set of items from an array. The input array is not modified.
     * @param itemCount The number of items to return.
     * @param items The array of items.
     * @returns An array of random items from the original array.
     * @throws If itemCount exceeds the length of items.
     */
    randomSet<T>(itemCount: number, items: T[]): T[];
    /**
     * Returns a random string of the specified length.
     * @param length The length of the string.
     * @returns A random alphanumeric string.
     */
    randomString(length: number): string;
    /**
     * Shuffles an array in place.
     * @param items The array to shuffle.
     * @returns The shuffled array.
     */
    shuffle<T>(items: T[]): T[];
    /**
     * Returns a random integer between 1 and max.
     * @param max The maximum value.
     * @returns A random integer between 1 and max.
     */
    simple(max: number): number;
    /**
     * Returns a random item from a weighted list.
     * @param items The list of weighted entries. Weights must be non-negative
     * finite numbers; entries with a weight of zero are never selected.
     * @returns A random item from the list, selected based on weight.
     * @throws If the list is empty, a weight is negative, NaN, or infinite, or the total weight is zero.
     */
    weighted<T>(items: WeightedEntry<T>[]): T;
}
