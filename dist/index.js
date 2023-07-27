'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.weighted = exports.shuffle = exports.randomString = exports.randomSet = exports.bellFloat = exports.item = exports.simple = void 0;
var random_1 = __importDefault(require("random"));
function simple(max) {
    /**
     * This function takes a maximum value and returns a random number between 1
     * and that value.
     *
     * @param {Number} max - The maximum value to return
     * @returns {Number} - A random number between 1 and the maximum value
     */
    return random_1.default.int(1, max);
}
exports.simple = simple;
function item(items) {
    /**
     * This function takes an array and returns a random item from it.
     *
     * @param {Array} items - The array to get the item from
     * @returns {Any} - A random item from the array
     */
    return items[random_1.default.int(0, items.length - 1)];
}
exports.item = item;
function bellFloat(min, max) {
    /**
     * This function takes a minimum and maximum value and returns a random float
     * between them, weighted towards the middle.
     *
     * @param {Number} min - The minimum value to return
     * @param {Number} max - The maximum value to return
     * @returns {Number} - A random float between the minimum and maximum values
     */
    var divisor = (max - min) / 3;
    var result = min;
    for (var i = 0; i < 3; i++) {
        result += random_1.default.float(0, divisor);
    }
    return result;
}
exports.bellFloat = bellFloat;
function randomSet(itemCount, items) {
    /**
     * This function takes an array and returns a random set of items from it.
     *
     * @param {Number} itemCount - The number of items to return
     * @param {Array} items - The array to get the items from
     * @returns {Array} - A random set of items from the array
     */
    var result = [];
    items = shuffle(items);
    for (var i = 0; i < itemCount; i++) {
        result.push(items.pop());
    }
    return result;
}
exports.randomSet = randomSet;
function randomString(length) {
    /**
     * This function takes a length and returns a random string of that length.
     *
     * @param {Number} length - The length of the string to return
     * @returns {String} - A random string of the specified length
     */
    var result = '';
    for (var i = 0; i < length; i++) {
        result += Math.random().toString(36).slice(2)[0];
    }
    return result;
}
exports.randomString = randomString;
function shuffle(items) {
    /**
     * This function takes an array and returns a shuffled version of it.
     *
     * @param {Array} items - An array of items to shuffle
     * @returns {Array} - A shuffled version of the array
     */
    for (var i = items.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * i);
        var temp = items[i];
        items[i] = items[j];
        items[j] = temp;
    }
    return items;
}
exports.shuffle = shuffle;
function weighted(items) {
    /**
     * This function takes an array of objects with a commonality property
     * and returns a random result, weighted by the commonality property.
     *
     * @param {Array} items - An array of objects with a commonality property
     * @returns {Object} - A random object from the array, weighted by the commonality property
     */
    var ceiling = 0;
    if (items.length == 1) {
        return items[0];
    }
    items.forEach(function (item) {
        ceiling += item.commonality;
    });
    var randomValue = random_1.default.int(0, ceiling);
    for (var i = 0; i < items.length; i++) {
        var item_1 = items[i];
        randomValue -= item_1.commonality;
        if (randomValue <= 0) {
            return item_1;
        }
    }
    throw new Error("Tried to get weighted result from array with length " + items.length + ", failed to get anything back");
}
exports.weighted = weighted;
