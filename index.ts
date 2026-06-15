import { generateSecret, checkGuess, validateGuess, MIN, MAX } from "./game";

const SECRET = generateSecret();
let attempts = 0;

console.log("🎲 Guess My Number!");
console.log(`I'm thinking of a number between ${MIN} and ${MAX}.`);
console.log("");

while (true) {
  const input = prompt("Your guess> ");
  if (input === null) {
    console.log("Goodbye!");
    process.exit(0);
  }

  const guess = validateGuess(input);
  if (guess === null) {
    console.log(`❌ Enter a number between ${MIN} and ${MAX}.`);
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
