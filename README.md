# @ironarachne/rng

A comprehensive random number generation library for TypeScript and JavaScript. It provides a seeded random number generator (RNG) class for deterministic results, along with a set of global convenience functions for quick and easy use.

Note that this is not meant for cryptography and should not be considered "safe" for such purposes.

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
- **`randomSet(count, array)`**: Returns a new array containing `count` unique items selected randomly from the source array.
- **`randomString(length)`**: Generates a random alphanumeric string of the specified length.
- **`shuffle(array)`**: Shuffles the given array in place using the Fisher-Yates algorithm.
- **`weighted(items)`**: Selects an item from an array of objects, where each object has a `commonality` number property. Items with higher `commonality` are more likely to be chosen.

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
- `setSeed(seed)`
- `simple(max)` (Returns 1 to max)
- `int(min, max)`
- `float(min, max)`
- `bellFloat(min, max)`
- `item(array)`
- `randomSet(count, array)`
- `randomString(length)`
- `shuffle(array)`
- `weighted(items)`

## Development

This project uses TypeScript.

### Setup

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Building

To build the project:

```bash
npm run build
```

### Testing

Tests are written using [Vitest](https://vitest.dev/).

```bash
npm test
```

### Linting and Formatting

This project uses [Biome](https://biomejs.dev/) for linting and formatting.

```bash
npm run biome
```

### Documentation

Generate documentation using TypeDoc:

```bash
npm run docs
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Write code and add tests.
4. Ensure all tests pass and the code is linted.
5. Submit a pull request.

## License

MIT
