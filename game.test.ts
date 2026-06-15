import { test, expect } from "bun:test";
import {
  generateSecret,
  checkGuess,
  validateGuess,
  parseDifficulty,
  DIFFICULTY_RANGES,
} from "./game";

test("generateSecret produces numbers in range", () => {
  for (let i = 0; i < 1000; i++) {
    const secret = generateSecret(1, 100);
    expect(secret).toBeGreaterThanOrEqual(1);
    expect(secret).toBeLessThanOrEqual(100);
  }
});

test("generateSecret respects easy range", () => {
  for (let i = 0; i < 1000; i++) {
    const secret = generateSecret(1, 10);
    expect(secret).toBeGreaterThanOrEqual(1);
    expect(secret).toBeLessThanOrEqual(10);
  }
});

test("checkGuess returns correct", () => {
  expect(checkGuess(50, 50)).toBe("correct");
});

test("checkGuess returns higher when guess < secret", () => {
  expect(checkGuess(30, 50)).toBe("higher");
});

test("checkGuess returns lower when guess > secret", () => {
  expect(checkGuess(70, 50)).toBe("lower");
});

test("validateGuess accepts valid numbers", () => {
  expect(validateGuess("50", 1, 100)).toBe(50);
  expect(validateGuess("1", 1, 100)).toBe(1);
  expect(validateGuess("100", 1, 100)).toBe(100);
});

test("validateGuess rejects invalid input", () => {
  expect(validateGuess("abc", 1, 100)).toBeNull();
  expect(validateGuess("0", 1, 100)).toBeNull();
  expect(validateGuess("101", 1, 100)).toBeNull();
  expect(validateGuess("-5", 1, 100)).toBeNull();
  expect(validateGuess("", 1, 100)).toBeNull();
});

test("parseDifficulty accepts valid difficulties", () => {
  expect(parseDifficulty("easy")).toBe("easy");
  expect(parseDifficulty("medium")).toBe("medium");
  expect(parseDifficulty("hard")).toBe("hard");
});

test("parseDifficulty rejects invalid difficulty", () => {
  expect(parseDifficulty("impossible")).toBeNull();
  expect(parseDifficulty("")).toBeNull();
});

test("DIFFICULTY_RANGES has correct values", () => {
  expect(DIFFICULTY_RANGES.easy).toEqual({ min: 1, max: 10 });
  expect(DIFFICULTY_RANGES.medium).toEqual({ min: 1, max: 50 });
  expect(DIFFICULTY_RANGES.hard).toEqual({ min: 1, max: 100 });
});
