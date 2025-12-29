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
    return globalRng.int(1, max);
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
    return items[globalRng.int(0, items.length - 1)];
}
/**
 * Returns a random float between min and max, weighted towards the middle.
 *
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns A random float between min and max.
 */
export function bellFloat(min, max) {
    const divisor = (max - min) / 3;
    let result = min;
    for (let i = 0; i < 3; i++) {
        result += globalRng.float(0, divisor);
    }
    return result;
}
/**
 * Returns a random set of items from an array.
 *
 * @param itemCount - The number of items to return.
 * @param items - The array to get the items from.
 * @returns A random set of items from the array.
 */
export function randomSet(itemCount, items) {
    const result = [];
    const itemSet = shuffle(items);
    for (let i = 0; i < itemCount; i++) {
        result.push(itemSet.pop());
    }
    return result;
}
/**
 * Returns a random string of the specified length.
 *
 * @param length - The length of the string to return.
 * @returns A random string of the specified length.
 */
export function randomString(length) {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += globalRng.next().toString(36).slice(2)[0];
    }
    return result;
}
/**
 * Returns a shuffled version of an array.
 *
 * @param items - An array of items to shuffle.
 * @returns A shuffled version of the array.
 */
export function shuffle(items) {
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(globalRng.next() * (i + 1));
        const temp = items[i];
        items[i] = items[j];
        items[j] = temp;
    }
    return items;
}
/**
 * Returns a random item from a weighted list.
 *
 * @param items - An array of weighted entries.
 * @returns A random item from the list, selected based on weight.
 */
export function weighted(items) {
    let ceiling = 0;
    if (items.length === 1) {
        return items[0].value;
    }
    for (const item of items) {
        ceiling += item.commonality;
    }
    let randomValue = globalRng.int(0, ceiling);
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        randomValue -= item.commonality;
        if (randomValue <= 0) {
            return item.value;
        }
    }
    throw new Error(`Tried to get weighted result from array with length ${items.length}, failed to get anything back`);
}
