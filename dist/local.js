/**
 * A seeded random number generator.
 */
export class RNG {
    seed;
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
    setSeed(seed) {
        if (typeof seed === "string") {
            this.seed = this.stringToSeed(seed);
        }
        else {
            this.seed = seed;
        }
    }
    next() {
        this.seed += 0x6d2b79f5;
        let t = this.seed;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    int(min, max) {
        return Math.floor(this.next() * (max - min + 1)) + min;
    }
    bellFloat(min, max) {
        const divisor = (max - min) / 3;
        let result = min;
        for (let i = 0; i < 3; i++) {
            result += this.float(0, divisor);
        }
        return result;
    }
    float(min, max) {
        return this.next() * (max - min) + min;
    }
    item(items) {
        return items[this.int(0, items.length - 1)];
    }
    randomSet(itemCount, items) {
        const result = [];
        let itemSet = this.shuffle([...items]);
        for (let i = 0; i < itemCount; i++) {
            result.push(itemSet.pop());
        }
        return result;
    }
    randomString(length) {
        let result = "";
        for (let i = 0; i < length; i++) {
            result += this.next().toString(36).slice(2)[0];
        }
        return result;
    }
    shuffle(items) {
        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(this.next() * (i + 1));
            const temp = items[i];
            items[i] = items[j];
            items[j] = temp;
        }
        return items;
    }
    weighted(items) {
        let ceiling = 0;
        if (items.length === 1) {
            return items[0];
        }
        for (const item of items) {
            ceiling += item.commonality;
        }
        let randomValue = this.int(0, ceiling);
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            randomValue -= item.commonality;
            if (randomValue <= 0) {
                return item;
            }
        }
        throw new Error(`Tried to get weighted result from array with length ${items.length}, failed to get anything back`);
    }
}
