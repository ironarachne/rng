import type { WeightedEntry } from "./types.js";
/**
 * Returns a random float between min and max.
 *
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns A random float between min and max.
 */
export declare function float(min: number, max: number): number;
/**
 * Sets the seed for the global random number generator.
 *
 * @param seed - The seed to use. Can be a number or a string.
 */
export declare function setSeed(seed: number | string): void;
/**
 * Returns a random integer between 1 and max.
 *
 * @param max - The maximum value.
 * @returns A random integer between 1 and max.
 */
export declare function simple(max: number): number;
/**
 * Returns a random integer between min and max.
 *
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns A random integer between min and max.
 */
export declare function int(min: number, max: number): number;
/**
 * Returns a random item from an array.
 *
 * @param items - The array to get the item from.
 * @returns A random item from the array.
 */
export declare function item(items: any[]): any;
/**
 * Returns a random float between min and max, weighted towards the middle.
 *
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns A random float between min and max.
 */
export declare function bellFloat(min: number, max: number): number;
/**
 * Returns a random set of items from an array.
 *
 * @param itemCount - The number of items to return.
 * @param items - The array to get the items from.
 * @returns A random set of items from the array.
 */
export declare function randomSet(itemCount: number, items: any[]): any[];
/**
 * Returns a random string of the specified length.
 *
 * @param length - The length of the string to return.
 * @returns A random string of the specified length.
 */
export declare function randomString(length: number): string;
/**
 * Returns a shuffled version of an array.
 *
 * @param items - An array of items to shuffle.
 * @returns A shuffled version of the array.
 */
export declare function shuffle<T>(items: T[]): T[];
/**
 * Returns a random item from a weighted list.
 *
 * @param items - An array of weighted entries.
 * @returns A random item from the list, selected based on weight.
 */
export declare function weighted<T>(items: WeightedEntry<T>[]): T;
