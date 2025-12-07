import { describe, expect, jest, test } from "@jest/globals";
import {
  RNG,
  bellFloat,
  item,
  randomSet,
  randomString,
  setSeed,
  shuffle,
  simple,
  weighted,
} from "../src/index";

jest.useFakeTimers();

describe("simple", () => {
  test("should return a number", () => {
    expect(simple(10)).toEqual(expect.any(Number));
  });
});

describe("RNG", () => {
  test("should be deterministic with the same seed", () => {
    const rng1 = new RNG(12345);
    const rng2 = new RNG(12345);

    expect(rng1.int(1, 100)).toBe(rng2.int(1, 100));
    expect(rng1.float(0, 1)).toBe(rng2.float(0, 1));
  });

  test("should produce different results with different seeds", () => {
    const rng1 = new RNG(12345);
    const rng2 = new RNG(67890);

    // It's possible but unlikely they produce the same number, but let's check a sequence
    const val1 = rng1.int(1, 100000);
    const val2 = rng2.int(1, 100000);
    expect(val1).not.toBe(val2);
  });

  test("should be deterministic with the same string seed", () => {
    const rng1 = new RNG("abc123");
    const rng2 = new RNG("abc123");
    expect(rng1.int(1, 100)).toBe(rng2.int(1, 100));
    expect(rng1.float(0, 1)).toBe(rng2.float(0, 1));
  });

  test("should produce different results with different string seeds", () => {
    const rng1 = new RNG("abc123");
    const rng2 = new RNG("xyz789");
    expect(rng1.int(1, 100)).not.toBe(rng2.int(1, 100));
    expect(rng1.float(0, 1)).not.toBe(rng2.float(0, 1));
  });

  test("global setSeed should affect global functions", () => {
    setSeed(12345);
    const val1 = simple(100);

    setSeed(12345);
    const val2 = simple(100);

    expect(val1).toBe(val2);
  });
});

describe("item", () => {
  test("should return an item from the array", () => {
    const items = ["a", "b", "c"];
    const result = item(items);
    expect(items).toContain(result);
  });
});

describe("bellFloat", () => {
  test("should return a number between min and max", () => {
    const result = bellFloat(1, 10);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
  });
});

describe("randomSet", () => {
  test("should return a set of items from the array", () => {
    const items = ["a", "b", "c", "d", "e"];
    // Create a copy because randomSet modifies the array
    const itemsCopy = [...items];
    const result = randomSet(3, itemsCopy);
    expect(result).toHaveLength(3);
    result.forEach((resItem: string) => {
      expect(items).toContain(resItem);
    });
  });
});

describe("randomString", () => {
  test("should return a string of the specified length", () => {
    const result = randomString(10);
    expect(result).toHaveLength(10);
    expect(typeof result).toBe("string");
  });
});

describe("shuffle", () => {
  test("should shuffle an array", () => {
    const items = [1, 2, 3, 4, 5];
    const original = [...items];

    // Use a seed to ensure shuffle actually changes order (most of the time)
    setSeed(12345);

    const result = shuffle(items);
    expect(result).toHaveLength(original.length);
    expect(result).toEqual(expect.arrayContaining(original));
    expect(result).not.toEqual(original); // This might fail if shuffle results in same order, but with seed 12345 and 5 items it should be different.
  });
});

describe("weighted", () => {
  test("should return an item based on weights", () => {
    const items = [
      { name: "common", commonality: 100 },
      { name: "rare", commonality: 1 },
    ];

    // With a high weight difference, we expect "common" most of the time.
    // But to be deterministic, let's use a seed.
    setSeed(12345);

    const result = weighted(items);
    expect(result).toBeDefined();
    expect(items).toContain(result);
  });

  test("should throw error if items is empty", () => {
    // The implementation throws if it fails to get anything back, which happens if loop finishes.
    // If items is empty, ceiling is 0. random.int(0,0) is 0. Loop doesn't run.
    // It throws "Tried to get weighted result from array with length 0..."
    expect(() => weighted([])).toThrow();
  });
});
