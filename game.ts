export const MIN = 1;
export const MAX = 100;

export function generateSecret(min: number = MIN, max: number = MAX): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function checkGuess(guess: number, secret: number): "correct" | "higher" | "lower" {
  if (guess === secret) return "correct";
  return guess < secret ? "higher" : "lower";
}

export function validateGuess(input: string, min: number = MIN, max: number = MAX): number | null {
  const trimmed = input.trim();
  const guess = parseInt(trimmed, 10);
  if (isNaN(guess) || guess < min || guess > max) return null;
  return guess;
}
