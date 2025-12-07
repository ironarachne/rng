/**
 * A seeded random number generator.
 */
export class RNG {
  private seed: number;

  constructor(seed: number | string) {
    if (typeof seed === "string") {
      this.seed = this.stringToSeed(seed);
    } else {
      this.seed = seed;
    }
  }

  private stringToSeed(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  public setSeed(seed: number | string) {
    if (typeof seed === "string") {
      this.seed = this.stringToSeed(seed);
    } else {
      this.seed = seed;
    }
  }

  public next(): number {
    this.seed += 0x6d2b79f5;
    let t = this.seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  public int(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  public float(min: number, max: number): number {
    return this.next() * (max - min) + min;
  }
}

const globalRng = new RNG(Date.now());

/**
 * Sets the seed for the global random number generator.
 *
 * @param {Number|String} seed - The seed to use
 */
export function setSeed(seed: number | string) {
  globalRng.setSeed(seed);
}


/**
 * This function takes a maximum value and returns a random number between 1
 * and that value.
 *
 * @param {Number} max - The maximum value to return
 * @returns {Number} - A random number between 1 and the maximum value
 */
export function simple(max: number): number {
  return globalRng.int(1, max);
}

/**
 * This function takes an array and returns a random item from it.
 *
 * @param {Array} items - The array to get the item from
 * @returns {Any} - A random item from the array
 */
export function item(items: any[]) {
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
export function bellFloat(min: number, max: number): number {
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
export function randomSet(itemCount: number, items: any[]): any[] {
  const result: any = [];

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
export function randomString(length: number): string {
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
export function shuffle(items: any[]) {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(globalRng.next() * i);
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
export function weighted(items: any[]) {
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

  throw new Error(
    `Tried to get weighted result from array with length ${items.length}, failed to get anything back`,
  );
}
