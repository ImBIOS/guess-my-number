import { test, expect } from "bun:test";
import { generateSecret, checkGuess, validateGuess, MIN, MAX } from "./game";

test("generateSecret produces numbers in range", () => {
  for (let i = 0; i < 1000; i++) {
    const secret = generateSecret();
    expect(secret).toBeGreaterThanOrEqual(MIN);
    expect(secret).toBeLessThanOrEqual(MAX);
  }
});

test("generateSecret respects custom range", () => {
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
  expect(validateGuess("50")).toBe(50);
  expect(validateGuess("1")).toBe(1);
  expect(validateGuess("100")).toBe(100);
});

test("validateGuess rejects invalid input", () => {
  expect(validateGuess("abc")).toBeNull();
  expect(validateGuess("0")).toBeNull();
  expect(validateGuess("101")).toBeNull();
  expect(validateGuess("-5")).toBeNull();
  expect(validateGuess("")).toBeNull();
});
