#!/usr/bin/env node

const { add, multiply } = require('./mathutils'); // Import functions
const args = process.argv.slice(2);

// Help text
if (args.includes("--help") || args.length < 2) {
  console.log(`
Usage: sum <command> [numbers]

Commands:
  add        Add the numbers.
  multiply   Multiply the numbers.
  --help     Show this help message.

Examples:
  sum add 1 2 3
  sum multiply 4 5
  `);
  process.exit(0);
}

// Extract command and operands
const [command, ...operands] = args;

// Convert operands to numbers
const numbers = operands.map(arg => parseFloat(arg));

// Validate inputs
if (numbers.some(isNaN)) {
  console.error("Error: All operands must be valid numbers.");
  process.exit(1);
}

// Perform the operation
let result;
if (command === "add") {
  result = add(numbers);
} else if (command === "multiply") {
  result = multiply(numbers);
} else {
  console.error(`Error: Unknown command "${command}". Use "add" or "multiply".`);
  process.exit(1);
}

// Output the result
console.log(`The result is: ${result}`);
