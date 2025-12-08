import { RNG } from "./local.js";
const globalRng = new RNG(Date.now());
/**
 * This function takes a minimum and maximum value and returns a random
 * float between them.
 *
 * @param {Number} min - The minimum value to return
 * @param {Number} max - The maximum value to return
 * @returns {Number} - A random float between the minimum and maximum values
 */
export function float(min, max) {
    return globalRng.float(min, max);
}
/**
 * Sets the seed for the global random number generator.
 *
 * @param {Number|String} seed - The seed to use
 */
export function setSeed(seed) {
    globalRng.setSeed(seed);
}
/**
 * This function takes a maximum value and returns a random number between 1
 * and that value.
 *
 * @param {Number} max - The maximum value to return
 * @returns {Number} - A random number between 1 and the maximum value
 */
export function simple(max) {
    return globalRng.int(1, max);
}
/**
 * This function takes a minimum and maximum value and returns a random
 * integer between them.
 *
 * @param {Number} min - The minimum value to return
 * @param {Number} max - The maximum value to return
 * @returns {Number} - A random integer between the minimum and maximum values
 */
export function int(min, max) {
    return globalRng.int(min, max);
}
/**
 * This function takes an array and returns a random item from it.
 *
 * @param {Array} items - The array to get the item from
 * @returns {Any} - A random item from the array
 */
export function item(items) {
    return items[globalRng.int(0, items.length - 1)];
}
/**
 * This function takes a minimum and maximum value and returns a random float
 * between them, weighted towards the middle.
 *
 * @param {Number} min - The minimum value to return
 * @param {Number} max - The maximum value to return
 * @returns {Number} - A random float between the minimum and maximum values
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
 * This function takes an array and returns a random set of items from it.
 *
 * @param {Number} itemCount - The number of items to return
 * @param {Array} items - The array to get the items from
 * @returns {Array} - A random set of items from the array
 */
export function randomSet(itemCount, items) {
    const result = [];
    let itemSet = shuffle(items);
    for (let i = 0; i < itemCount; i++) {
        result.push(itemSet.pop());
    }
    return result;
}
/**
 * This function takes a length and returns a random string of that length.
 *
 * @param {Number} length - The length of the string to return
 * @returns {String} - A random string of the specified length
 */
export function randomString(length) {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += globalRng.next().toString(36).slice(2)[0];
    }
    return result;
}
/**
 * This function takes an array and returns a shuffled version of it.
 *
 * @param {Array} items - An array of items to shuffle
 * @returns {Array} - A shuffled version of the array
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
 * This function takes an array of objects with a commonality property
 * and returns a random result, weighted by the commonality property.
 *
 * @param {Array} items - An array of objects with a commonality property
 * @returns {Object} - A random object from the array, weighted by the commonality property
 */
export function weighted(items) {
    let ceiling = 0;
    if (items.length === 1) {
        return items[0];
    }
    for (const item of items) {
        ceiling += item.commonality;
    }
    let randomValue = globalRng.int(0, ceiling);
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        randomValue -= item.commonality;
        if (randomValue <= 0) {
            return item;
        }
    }
    throw new Error(`Tried to get weighted result from array with length ${items.length}, failed to get anything back`);
}
