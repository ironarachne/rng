import { describe, expect, test } from "vitest";

import {
  bellFloat,
  float,
  int,
  item,
  RNG,
  randomSet,
  randomString,
  setSeed,
  shuffle,
  simple,
  weighted,
} from "../src/index";

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

  test("global functions should match RNG class methods", () => {
    setSeed(424242);
    const local = new RNG(424242);

    expect(simple(100)).toBe(local.simple(100));
    expect(int(1, 100)).toBe(local.int(1, 100));
    expect(float(0, 10)).toBe(local.float(0, 10));
    expect(bellFloat(1, 10)).toBe(local.bellFloat(1, 10));
    expect(randomString(10)).toBe(local.randomString(10));
    expect(item(["a", "b", "c", "d", "e"])).toBe(
      local.item(["a", "b", "c", "d", "e"]),
    );

    const source = ["a", "b", "c", "d", "e"];
    expect(randomSet(2, [...source])).toEqual(local.randomSet(2, [...source]));
    expect(shuffle([...source])).toEqual(local.shuffle([...source]));

    const table = [
      { value: "gold", commonality: 10 },
      { value: "silver", commonality: 50 },
    ];
    expect(weighted(table)).toBe(local.weighted(table));
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
    setSeed(12345);
    const result = randomSet(3, items);
    expect(result).toHaveLength(3);
    result.forEach((resItem: string) => {
      expect(items).toContain(resItem);
    });
  });

  test("should not modify the input array", () => {
    const items = ["a", "b", "c", "d", "e"];
    const snapshot = [...items];
    setSeed(12345);
    randomSet(3, items);
    expect(items).toEqual(snapshot);
  });

  test("should return unique items", () => {
    const items = ["a", "b", "c", "d", "e"];
    setSeed(777);
    const result = randomSet(5, items);
    expect(new Set(result).size).toBe(5);
  });

  test("should be deterministic with the same seed", () => {
    setSeed(42);
    const first = randomSet(3, ["a", "b", "c", "d", "e"]);
    setSeed(42);
    const second = randomSet(3, ["a", "b", "c", "d", "e"]);
    expect(first).toEqual(second);
  });

  test("should throw when itemCount exceeds array length", () => {
    expect(() => randomSet(6, ["a", "b", "c"])).toThrow(/exceeds array length/);
  });

  test("RNG.randomSet should throw when itemCount exceeds array length", () => {
    const rng = new RNG(12345);
    expect(() => rng.randomSet(6, ["a", "b", "c"])).toThrow(
      /exceeds array length/,
    );
  });
});

describe("randomString", () => {
  test("should return a string of the specified length", () => {
    setSeed(12345);
    const result = randomString(10);
    expect(result).toHaveLength(10);
    expect(typeof result).toBe("string");
  });

  test("should return strings of various lengths", () => {
    setSeed(12345);
    expect(randomString(0)).toBe("");
    expect(randomString(1)).toHaveLength(1);
    expect(randomString(100)).toHaveLength(100);
  });

  test("should only contain lowercase alphanumeric characters", () => {
    setSeed(12345);
    expect(randomString(500)).toMatch(/^[0-9a-z]*$/);
  });

  test("should be deterministic with the same seed", () => {
    setSeed(777);
    const first = randomString(20);
    setSeed(777);
    const second = randomString(20);
    expect(first).toBe(second);
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
      { value: "common", commonality: 100 },
      { value: "rare", commonality: 1 },
    ];

    // With a high weight difference, we expect "common" most of the time.
    // But to be deterministic, let's use a seed.
    setSeed(12345);

    const result = weighted(items);
    expect(result).toBeDefined();
    expect(["common", "rare"]).toContain(result);
  });

  test("should return the single item for a one-entry list", () => {
    setSeed(12345);
    expect(weighted([{ value: "only", commonality: 5 }])).toBe("only");
  });

  test("should never select a zero-weight entry", () => {
    const rng = new RNG(12345);
    const table = [
      { value: "never", commonality: 0 },
      { value: "always", commonality: 10 },
    ];

    const seen = new Set<string>();
    for (let i = 0; i < 20000; i++) {
      seen.add(rng.weighted(table));
    }

    expect(seen.has("never")).toBe(false);
  });

  test("should select items proportionally to weight", () => {
    const rng = new RNG(54321);
    const table = [
      { value: "a", commonality: 1 },
      { value: "b", commonality: 1 },
    ];

    let aCount = 0;
    const draws = 20000;
    for (let i = 0; i < draws; i++) {
      if (rng.weighted(table) === "a") {
        aCount++;
      }
    }

    const aShare = aCount / draws;
    expect(aShare).toBeGreaterThan(0.45);
    expect(aShare).toBeLessThan(0.55);
  });

  test("should support fractional weights", () => {
    const rng = new RNG(98765);
    const table = [
      { value: "light", commonality: 0.5 },
      { value: "heavy", commonality: 1.5 },
    ];

    let lightCount = 0;
    const draws = 20000;
    for (let i = 0; i < draws; i++) {
      if (rng.weighted(table) === "light") {
        lightCount++;
      }
    }

    const lightShare = lightCount / draws;
    expect(lightShare).toBeGreaterThan(0.22);
    expect(lightShare).toBeLessThan(0.28);
  });

  test("should throw error if items is empty", () => {
    expect(() => weighted([])).toThrow(/must not be empty/);
  });

  test("should throw error for negative weights", () => {
    expect(() =>
      weighted([
        { value: "a", commonality: 10 },
        { value: "b", commonality: -1 },
      ]),
    ).toThrow(/non-negative finite/);
  });

  test("should throw error for NaN weights", () => {
    expect(() =>
      weighted([{ value: "a", commonality: Number.NaN }]),
    ).toThrow(/non-negative finite/);
  });

  test("should throw error for infinite weights", () => {
    expect(() =>
      weighted([{ value: "a", commonality: Number.POSITIVE_INFINITY }]),
    ).toThrow(/non-negative finite/);
  });

  test("should throw error when all weights are zero", () => {
    expect(() =>
      weighted([
        { value: "a", commonality: 0 },
        { value: "b", commonality: 0 },
      ]),
    ).toThrow(/total weight/);
  });

  test("should throw error when weights overflow to infinite total", () => {
    expect(() =>
      weighted([
        { value: "a", commonality: Number.MAX_VALUE },
        { value: "b", commonality: Number.MAX_VALUE },
      ]),
    ).toThrow(/total weight/);
  });
});
