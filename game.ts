export const DIFFICULTY_RANGES = {
  easy: { min: 1, max: 10 },
  medium: { min: 1, max: 50 },
  hard: { min: 1, max: 100 },
} as const;

export type Difficulty = keyof typeof DIFFICULTY_RANGES;

export function generateSecret(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function checkGuess(guess: number, secret: number): "correct" | "higher" | "lower" {
  if (guess === secret) return "correct";
  return guess < secret ? "higher" : "lower";
}

export function validateGuess(input: string, min: number, max: number): number | null {
  const trimmed = input.trim();
  const guess = parseInt(trimmed, 10);
  if (isNaN(guess) || guess < min || guess > max) return null;
  return guess;
}

export function parseDifficulty(arg: string): Difficulty | null {
  if (arg in DIFFICULTY_RANGES) return arg as Difficulty;
  return null;
}

export function parseMaxAttempts(arg: string | undefined): number {
  if (!arg) return Infinity;
  const n = parseInt(arg, 10);
  if (isNaN(n) || n < 1) return Infinity;
  return n;
}
