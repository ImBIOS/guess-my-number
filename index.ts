import {
  generateSecret,
  checkGuess,
  validateGuess,
  DIFFICULTY_RANGES,
  parseDifficulty,
  parseMaxAttempts,
} from "./game";

const args = process.argv.slice(2);
const diffArg = args.find((a) => a.startsWith("--difficulty="));
const diffValue = diffArg?.split("=")[1] ?? "hard";
const difficulty = parseDifficulty(diffValue);

if (!difficulty) {
  console.error(`Invalid difficulty: "${diffValue}"`);
  console.error(`Options: ${Object.keys(DIFFICULTY_RANGES).join(", ")}`);
  process.exit(1);
}

const maxAttemptsArg = args.find((a) => a.startsWith("--max-attempts="))?.split("=")[1];
const maxAttempts = parseMaxAttempts(maxAttemptsArg);

const range = DIFFICULTY_RANGES[difficulty];
const SECRET = generateSecret(range.min, range.max);
let attempts = 0;

console.log("🎲 Guess My Number!");
console.log(`Difficulty: ${difficulty} (${range.min}-${range.max})`);
console.log(
  maxAttempts === Infinity
    ? `I'm thinking of a number between ${range.min} and ${range.max}. No attempt limit.`
    : `I'm thinking of a number between ${range.min} and ${range.max}. You have ${maxAttempts} attempts.`
);
console.log("");

while (true) {
  const input = prompt("Your guess> ");
  if (input === null) {
    console.log("Goodbye!");
    process.exit(0);
  }

  const guess = validateGuess(input, range.min, range.max);
  if (guess === null) {
    console.log(`❌ Enter a number between ${range.min} and ${range.max}.`);
    continue;
  }

  attempts++;
  const result = checkGuess(guess, SECRET);

  if (result === "correct") {
    console.log(`🎉 Correct! You won in ${attempts} attempt${attempts === 1 ? "" : "s"}.`);
    break;
  }

  if (attempts >= maxAttempts) {
    console.log(`💀 Game over! You ran out of attempts. The secret was ${SECRET}.`);
    break;
  }

  if (result === "higher") {
    console.log("📈 Higher!");
  } else {
    console.log("📉 Lower!");
  }
}
