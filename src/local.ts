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

  public bellFloat(min: number, max: number): number {
    const divisor = (max - min) / 3;

    let result = min;

    for (let i = 0; i < 3; i++) {
      result += this.float(0, divisor);
    }

    return result;
  }

  public float(min: number, max: number): number {
    return this.next() * (max - min) + min;
  }

  public item<T>(items: T[]): T {
    return items[this.int(0, items.length - 1)];
  }

  public randomSet<T>(itemCount: number, items: T[]): T[] {
    const result: T[] = [];

    let itemSet = this.shuffle([...items]);

    for (let i = 0; i < itemCount; i++) {
      result.push(itemSet.pop() as T);
    }

    return result;
  }

  public randomString(length: number): string {
    let result = "";

    for (let i = 0; i < length; i++) {
      result += this.next().toString(36).slice(2)[0];
    }

    return result;
  }

  public shuffle<T>(items: T[]): T[] {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      const temp = items[i];
      items[i] = items[j];
      items[j] = temp;
    }
    return items;
  }

  public weighted<T extends { commonality: number }>(items: T[]): T {
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

    throw new Error(
      `Tried to get weighted result from array with length ${items.length}, failed to get anything back`,
    );
  }
}
