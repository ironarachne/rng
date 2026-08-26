import { RNG } from "./local.js";
const globalRng = new RNG(Date.now());
/**
 * Returns a random float between min and max.
 *
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns A random float between min and max.
 */
export function float(min, max) {
    return globalRng.float(min, max);
}
/**
 * Sets the seed for the global random number generator.
 *
 * @param seed - The seed to use. Can be a number or a string.
 */
export function setSeed(seed) {
    globalRng.setSeed(seed);
}
/**
 * Returns a random integer between 1 and max.
 *
 * @param max - The maximum value.
 * @returns A random integer between 1 and max.
 */
export function simple(max) {
    return globalRng.simple(max);
}
/**
 * Returns a random integer between min and max.
 *
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns A random integer between min and max.
 */
export function int(min, max) {
    return globalRng.int(min, max);
}
/**
 * Returns a random item from an array.
 *
 * @param items - The array to get the item from.
 * @returns A random item from the array.
 */
export function item(items) {
    return globalRng.item(items);
}
/**
 * Returns a random float between min and max, weighted towards the middle.
 *
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns A random float between min and max.
 */
export function bellFloat(min, max) {
    return globalRng.bellFloat(min, max);
}
/**
 * Returns a random set of items from an array. The input array is not modified.
 *
 * @param itemCount - The number of items to return.
 * @param items - The array to get the items from.
 * @returns A random set of items from the array.
 * @throws If itemCount exceeds the length of items.
 */
export function randomSet(itemCount, items) {
    return globalRng.randomSet(itemCount, items);
}
/**
 * Returns a random string of the specified length.
 *
 * @param length - The length of the string to return.
 * @returns A random alphanumeric string of the specified length.
 */
export function randomString(length) {
    return globalRng.randomString(length);
}
/**
 * Shuffles an array in place.
 *
 * @param items - An array of items to shuffle.
 * @returns The shuffled array.
 */
export function shuffle(items) {
    return globalRng.shuffle(items);
}
/**
 * Returns a random item from a weighted list.
 *
 * @param items - An array of weighted entries.
 * @returns A random item from the list, selected based on weight.
 * @throws If the list is empty, a weight is invalid, or the total weight is zero.
 */
export function weighted(items) {
    return globalRng.weighted(items);
}
