## What changed

<!-- A short description of the change and why it is needed. -->

## Related issue

<!-- e.g. Closes #123. Write "None" if this is not tied to an issue. -->

## Type of change

- [ ] Bug fix (non-breaking)
- [ ] New feature (non-breaking)
- [ ] Breaking change (changes existing behavior or the public API)
- [ ] Documentation or tooling only

## Determinism

- [ ] This change does **not** alter the sequence produced by an existing seed.
- [ ] It does alter the sequence, and I have called that out below as a
      breaking change.

<!--
Changing RNG.next(), or changing how many times an existing method calls it,
changes every downstream result for every existing seed. That is a major
version bump. See CODE_STYLE.md.
-->

## Checklist

- [ ] `npm run check` passes locally (lint, build, tests).
- [ ] Tests cover the new behavior, including boundaries and thrown errors.
- [ ] TSDoc comments are updated for any changed public API.
- [ ] `README.md` is updated if the public API changed.
- [ ] The change follows [CODE_STYLE.md](../CODE_STYLE.md).
