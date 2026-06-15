# guess-my-number

A simple terminal number guessing game built with Bun.

## Play

```bash
bun run index.ts                              # hard (1-100, no limit)
bun run index.ts --difficulty=easy            # 1-10
bun run index.ts --difficulty=medium          # 1-50
bun run index.ts --max-attempts=5             # game over after 5 wrong guesses
```

## Test

```bash
bun test
```
