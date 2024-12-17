// Importing winston for logging
const winston = require('winston');

// Setting up the logger
const logger = winston.createLogger({
  level: 'info', // Default log level
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console({ format: winston.format.combine(winston.format.colorize(), winston.format.simple()) })
  ],
});

// Log program start event
logger.info('Program started');

// Function to perform division
function divide(a, b) {
  if (b === 0) {
    // Log fatal error for division by zero
    logger.error('Fatal error: Division by zero');
    return 'Cannot divide by zero';
  }
  const result = a / b;
  logger.info(`Operation successful: ${a} / ${b} = ${result}`);
  return result;
}

// Function to add numbers
function add(numbers) {
  return numbers.reduce((sum, num) => sum + num, 0);
}

// Function to multiply numbers
function multiply(numbers) {
  return numbers.reduce((product, num) => product * num, 1);
}

// Function to handle the arguments
function processArgs() {
  const args = process.argv.slice(2);
  const multiplyMode = args.includes("--multiply");
  const command = args[0];
  const numbers = args.slice(1).map(arg => parseFloat(arg));

  // Handle invalid command
  if (command !== "add" && command !== "multiply") {
    logger.warn(`Warning: Unrecognized command "${command}", defaulting to "add".`);
    return add(numbers); // Defaults to add
  }

  // Handle invalid numbers
  if (numbers.some(isNaN)) {
    logger.error('Error: Please provide valid numbers');
    return;
  }

  let result;
  if (multiplyMode) {
    result = multiply(numbers);
    logger.info(`The product of the numbers is: ${result}`);
  } else {
    result = add(numbers);
    logger.info(`The sum of the numbers is: ${result}`);
  }
  return result;
}

// Example of usage
processArgs();
