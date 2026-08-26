import type { WeightedEntry } from "./types.js";

const ALPHANUMERIC = "0123456789abcdefghijklmnopqrstuvwxyz";

/**
 * A seeded random number generator.
 */
export class RNG {
  private seed: number;

  /**
   * Creates a new RNG instance.
   * @param seed The seed to use. Can be a number or a string.
   */
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

  /**
   * Sets the seed for the random number generator.
   * @param seed The seed to use. Can be a number or a string.
   */
  public setSeed(seed: number | string) {
    if (typeof seed === "string") {
      this.seed = this.stringToSeed(seed);
    } else {
      this.seed = seed;
    }
  }

  /**
   * Generates the next random number in the sequence.
   * @returns A random number between 0 and 1.
   */
  public next(): number {
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
  public int(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  /**
   * Returns a random float between min and max, with a bell curve distribution.
   * @param min The minimum value.
   * @param max The maximum value.
   * @returns A random float between min and max.
   */
  public bellFloat(min: number, max: number): number {
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
  public float(min: number, max: number): number {
    return this.next() * (max - min) + min;
  }

  /**
   * Returns a random item from an array.
   * @param items The array of items.
   * @returns A random item from the array.
   */
  public item<T>(items: T[]): T {
    return items[this.int(0, items.length - 1)];
  }

  /**
   * Returns a random set of items from an array. The input array is not modified.
   * @param itemCount The number of items to return.
   * @param items The array of items.
   * @returns An array of random items from the original array.
   * @throws If itemCount exceeds the length of items.
   */
  public randomSet<T>(itemCount: number, items: T[]): T[] {
    if (itemCount > items.length) {
      throw new Error(
        `randomSet(): itemCount (${itemCount}) exceeds array length (${items.length})`,
      );
    }

    const result: T[] = [];

    const itemSet = this.shuffle([...items]);

    for (let i = 0; i < itemCount; i++) {
      result.push(itemSet.pop() as T);
    }

    return result;
  }

  /**
   * Returns a random string of the specified length.
   * @param length The length of the string.
   * @returns A random alphanumeric string.
   */
  public randomString(length: number): string {
    let result = "";

    for (let i = 0; i < length; i++) {
      result += ALPHANUMERIC[this.int(0, 35)];
    }

    return result;
  }

  /**
   * Shuffles an array in place.
   * @param items The array to shuffle.
   * @returns The shuffled array.
   */
  public shuffle<T>(items: T[]): T[] {
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
  public simple(max: number): number {
    return this.int(1, max);
  }

  /**
   * Returns a random item from a weighted list.
   * @param items The list of weighted entries. Weights must be non-negative
   * finite numbers; entries with a weight of zero are never selected.
   * @returns A random item from the list, selected based on weight.
   * @throws If the list is empty, a weight is negative, NaN, or infinite, or the total weight is zero.
   */
  public weighted<T>(items: WeightedEntry<T>[]): T {
    if (items.length === 0) {
      throw new Error("weighted(): items must not be empty");
    }

    let total = 0;

    for (const item of items) {
      if (!Number.isFinite(item.commonality) || item.commonality < 0) {
        throw new Error(
          "weighted(): commonality must be a non-negative finite number",
        );
      }
      total += item.commonality;
    }

    if (!Number.isFinite(total) || total <= 0) {
      throw new Error("weighted(): total weight must be positive and finite");
    }

    let randomValue = this.next() * total;

    for (const item of items) {
      randomValue -= item.commonality;
      if (randomValue < 0) {
        return item.value;
      }
    }

    return items[items.length - 1].value;
  }
}
