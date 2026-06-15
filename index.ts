import {
  generateSecret,
  checkGuess,
  validateGuess,
  DIFFICULTY_RANGES,
  parseDifficulty,
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

const range = DIFFICULTY_RANGES[difficulty];
const SECRET = generateSecret(range.min, range.max);
let attempts = 0;

console.log("🎲 Guess My Number!");
console.log(`Difficulty: ${difficulty} (${range.min}-${range.max})`);
console.log(`I'm thinking of a number between ${range.min} and ${range.max}.`);
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
  } else if (result === "higher") {
    console.log("📈 Higher!");
  } else {
    console.log("📉 Lower!");
  }
}
