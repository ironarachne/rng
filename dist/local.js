/**
 * A seeded random number generator.
 */
export class RNG {
    seed;
    /**
     * Creates a new RNG instance.
     * @param seed The seed to use. Can be a number or a string.
     */
    constructor(seed) {
        if (typeof seed === "string") {
            this.seed = this.stringToSeed(seed);
        }
        else {
            this.seed = seed;
        }
    }
    stringToSeed(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
    /**
     * Sets the seed for the random number generator.
     * @param seed The seed to use. Can be a number or a string.
     */
    setSeed(seed) {
        if (typeof seed === "string") {
            this.seed = this.stringToSeed(seed);
        }
        else {
            this.seed = seed;
        }
    }
    /**
     * Generates the next random number in the sequence.
     * @returns A random number between 0 and 1.
     */
    next() {
        this.seed += 0x6d2b79f5;
        let t = this.seed;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    /**
     * Returns a random integer between min and max (inclusive).
     * @param min The minimum value.
     * @param max The maximum value.
     * @returns A random integer between min and max.
     */
    int(min, max) {
        return Math.floor(this.next() * (max - min + 1)) + min;
    }
    /**
     * Returns a random float between min and max, with a bell curve distribution.
     * @param min The minimum value.
     * @param max The maximum value.
     * @returns A random float between min and max.
     */
    bellFloat(min, max) {
        const divisor = (max - min) / 3;
        let result = min;
        for (let i = 0; i < 3; i++) {
            result += this.float(0, divisor);
        }
        return result;
    }
    /**
     * Returns a random float between min and max.
     * @param min The minimum value.
     * @param max The maximum value.
     * @returns A random float between min and max.
     */
    float(min, max) {
        return this.next() * (max - min) + min;
    }
    /**
     * Returns a random item from an array.
     * @param items The array of items.
     * @returns A random item from the array.
     */
    item(items) {
        return items[this.int(0, items.length - 1)];
    }
    /**
     * Returns a random set of items from an array.
     * @param itemCount The number of items to return.
     * @param items The array of items.
     * @returns An array of random items from the original array.
     */
    randomSet(itemCount, items) {
        const result = [];
        const itemSet = this.shuffle([...items]);
        for (let i = 0; i < itemCount; i++) {
            result.push(itemSet.pop());
        }
        return result;
    }
    /**
     * Returns a random string of the specified length.
     * @param length The length of the string.
     * @returns A random string.
     */
    randomString(length) {
        let result = "";
        for (let i = 0; i < length; i++) {
            result += this.next().toString(36).slice(2)[0];
        }
        return result;
    }
    /**
     * Shuffles an array in place.
     * @param items The array to shuffle.
     * @returns The shuffled array.
     */
    shuffle(items) {
        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(this.next() * (i + 1));
            const temp = items[i];
            items[i] = items[j];
            items[j] = temp;
        }
        return items;
    }
    /**
     * Returns a random integer between 1 and max.
     * @param max The maximum value.
     * @returns A random integer between 1 and max.
     */
    simple(max) {
        return this.int(1, max);
    }
    /**
     * Returns a random item from a weighted list.
     * @param items The list of weighted entries.
     * @returns A random item from the list, selected based on weight.
     */
    weighted(items) {
        let ceiling = 0;
        if (items.length === 1) {
            return items[0].value;
        }
        for (const item of items) {
            ceiling += item.commonality;
        }
        let randomValue = this.int(0, ceiling);
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            randomValue -= item.commonality;
            if (randomValue <= 0) {
                return item.value;
            }
        }
        throw new Error(`Tried to get weighted result from array with length ${items.length}, failed to get anything back`);
    }
}
