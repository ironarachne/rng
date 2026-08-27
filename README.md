# @ironarachne/rng

A comprehensive random number generation library for TypeScript and JavaScript. It provides a seeded random number generator (RNG) class for deterministic results, along with a set of global convenience functions for quick and easy use.

Note that this is not meant for cryptography and should not be considered "safe" for such purposes.

Documentation available at: [ironarachne.github.io/rng](https://ironarachne.github.io/rng)

## Installation

```bash
npm install @ironarachne/rng
```

## Usage

### The `RNG` Class

The core of this library is the `RNG` class. You can instantiate it with a seed (number or string) to get a deterministic sequence of random numbers. This is ideal for procedural generation, games, or testing where reproducibility is key.

```typescript
import { RNG } from '@ironarachne/rng';

// Initialize with a numeric seed
const rng1 = new RNG(12345);
console.log(rng1.int(1, 100)); // Always produces the same sequence for seed 12345

// Initialize with a string seed
const rng2 = new RNG("my-seed-string");
console.log(rng2.item(['apple', 'banana', 'cherry']));
```

#### Methods

- **`next()`**: Returns a random float between 0 (inclusive) and 1 (exclusive).
- **`int(min, max)`**: Returns a random integer between `min` and `max` (inclusive).
- **`float(min, max)`**: Returns a random float between `min` and `max`.
- **`bellFloat(min, max)`**: Returns a random float between `min` and `max` with a bell-curve distribution (approximated by summing 3 random floats).
- **`item(array)`**: Returns a random item from the given array.
- **`randomSet(count, array)`**: Returns a new array containing `count` unique items selected randomly from the source array. The source array is not modified. Throws an error if `count` exceeds the source array's length.
- **`randomString(length)`**: Generates a random alphanumeric string of the specified length.
- **`shuffle(array)`**: Shuffles the given array in place using the Fisher-Yates algorithm.
- **`simple(max)`**: Returns a random float between 1 and `max`.
- **`weighted(items)`**: Selects a value from an array of `WeightedEntry` objects. Each entry must have a `value` and a `commonality` (weight). Weights must be non-negative finite numbers; an entry with a weight of `0` is never selected, and fractional weights are supported. Returns the `value` of the selected entry. Throws an error if the list is empty, a weight is negative, `NaN`, or infinite, or the total weight is zero.

```typescript
const lootTable = [
  { value: 'gold', commonality: 10 },
  { value: 'silver', commonality: 50 },
  { value: 'copper', commonality: 100 }
];
const loot = rng.weighted(lootTable); // Returns 'gold', 'silver', or 'copper'
```

### Global Convenience Functions

For simple use cases where you don't need to manage a specific seed instance, the library exports a global instance and wrapper functions. These share a single global state.

```typescript
import { int, item, setSeed } from '@ironarachne/rng';

// Optional: Set the global seed
setSeed(Date.now());

const roll = int(1, 20);
const fruit = item(['apple', 'banana', 'cherry']);
```

Available global functions:
- `bellFloat(min, max)`
- `float(min, max)`
- `int(min, max)`
- `item(array)`
- `randomSet(count, array)`
- `randomString(length)`
- `setSeed(seed)`
- `shuffle(array)`
- `simple(max)` (Returns 1 to max)
- `weighted(items)`

## Development

### Setup

Node 20 or newer is required.

```bash
git clone https://github.com/ironarachne/rng.git
cd rng
npm install
```

### Commands

| Command            | What it does                                    |
| ------------------ | ----------------------------------------------- |
| `npm run check`    | Lint, build, and test — run this before pushing. |
| `npm test`         | Run the [Vitest](https://vitest.dev/) suite.     |
| `npm run lint`     | Check formatting and lint rules with [Biome](https://biomejs.dev/). |
| `npm run lint:fix` | Apply formatting and safe lint fixes.            |
| `npm run build`    | Compile TypeScript to `dist/`.                   |
| `npm run docs`     | Generate the TypeDoc site into `docs/`.          |

`dist/` and `docs/` are generated output and are not committed.

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for the pull
request process and [CODE_STYLE.md](CODE_STYLE.md) for the conventions this
codebase follows.

In short: branch from `main`, run `npm run check`, and open a pull request.
`main` is protected, so every change lands through review with CI green.

## License

MIT — see [LICENSE](LICENSE).
