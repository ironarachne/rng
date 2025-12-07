/**
 * Sets the seed for the global random number generator.
 *
 * @param {Number|String} seed - The seed to use
 */
export declare function setSeed(seed: number | string): void;
/**
 * This function takes a maximum value and returns a random number between 1
 * and that value.
 *
 * @param {Number} max - The maximum value to return
 * @returns {Number} - A random number between 1 and the maximum value
 */
export declare function simple(max: number): number;
/**
 * This function takes an array and returns a random item from it.
 *
 * @param {Array} items - The array to get the item from
 * @returns {Any} - A random item from the array
 */
export declare function item(items: any[]): any;
/**
 * This function takes a minimum and maximum value and returns a random float
 * between them, weighted towards the middle.
 *
 * @param {Number} min - The minimum value to return
 * @param {Number} max - The maximum value to return
 * @returns {Number} - A random float between the minimum and maximum values
 */
export declare function bellFloat(min: number, max: number): number;
/**
 * This function takes an array and returns a random set of items from it.
 *
 * @param {Number} itemCount - The number of items to return
 * @param {Array} items - The array to get the items from
 * @returns {Array} - A random set of items from the array
 */
export declare function randomSet(itemCount: number, items: any[]): any[];
/**
 * This function takes a length and returns a random string of that length.
 *
 * @param {Number} length - The length of the string to return
 * @returns {String} - A random string of the specified length
 */
export declare function randomString(length: number): string;
/**
 * This function takes an array and returns a shuffled version of it.
 *
 * @param {Array} items - An array of items to shuffle
 * @returns {Array} - A shuffled version of the array
 */
export declare function shuffle(items: any[]): any[];
/**
 * This function takes an array of objects with a commonality property
 * and returns a random result, weighted by the commonality property.
 *
 * @param {Array} items - An array of objects with a commonality property
 * @returns {Object} - A random object from the array, weighted by the commonality property
 */
export declare function weighted(items: any[]): any;
