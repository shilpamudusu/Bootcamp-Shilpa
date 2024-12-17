// sum.js

// Retrieve arguments, ignoring the first two (node and script path)
const args = process.argv.slice(2);

// Help text
if (args.includes("--help")) {
  console.log(`
Usage: node sum.js [numbers] [--multiply]

Options:
  --multiply     Multiply the numbers instead of adding them.
  --help         Show this help message.
  `);
  process.exit(0);
}

// Check for --multiply flag
const multiplyMode = args.includes("--multiply");

// Filter out non-numeric flags
const numbers = args.filter(arg => !isNaN(parseFloat(arg)));

// Validate inputs
if (numbers.length === 0) {
  console.error("Error: Please provide valid numbers to process.");
  process.exit(1);
}

// Convert inputs to numbers
const parsedNumbers = numbers.map(num => parseFloat(num));

// Calculate result
let result;
if (multiplyMode) {
  result = parsedNumbers.reduce((product, num) => product * num, 1);
} else {
  result = parsedNumbers.reduce((sum, num) => sum + num, 0);
}

// Output result
const operation = multiplyMode ? "product" : "sum";
console.log(`The ${operation} of the numbers is: ${result}`);
