// sum.js

// Retrieve arguments, ignoring the first two (node and script path)
const args = process.argv.slice(2);

// Check if arguments are provided
if (args.length === 0) {
  console.error("Error: Please provide numbers to sum.");
  process.exit(1);
}

// Validate and calculate sum
let sum = 0;
for (const arg of args) {
  const number = parseFloat(arg);

  if (isNaN(number)) {
    console.error(`Error: "${arg}" is not a valid number.`);
    process.exit(1);
  }

  sum += number;
}

// Print the result
console.log(`The sum of the numbers is: ${sum}`);
