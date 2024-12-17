const readline = require('readline');
const logger = require('./logger');
const debug = require('./debugger');

// Create an interface for interactive user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to perform computation
function compute(a, b, operation) {
  let result;
  debug(`Starting computation: ${a} ${operation} ${b}`);  // Debugging message

  switch (operation) {
    case 'add':
      result = a + b;
      debug(`Addition result: ${result}`);  // Debugging message
      break;
    case 'subtract':
      result = a - b;
      debug(`Subtraction result: ${result}`);  // Debugging message
      break;
    case 'multiply':
      result = a * b;
      debug(`Multiplication result: ${result}`);  // Debugging message
      break;
    case 'divide':
      if (b !== 0) {
        result = a / b;
        debug(`Division result: ${result}`);  // Debugging message
      } else {
        result = 'Error: Division by zero';
        debug(result);  // Debugging message
      }
      break;
    default:
      result = 'Error: Invalid operation';
      debug(result);  // Debugging message
  }

  // Log the result using winston
  logger.info(`Computation completed: ${result}`);
  return result;
}

// Prompt user for input and call compute function
rl.question('Enter the first number: ', (num1) => {
  rl.question('Enter the second number: ', (num2) => {
    rl.question('Enter the operation (add, subtract, multiply, divide): ', (operation) => {
      const result = compute(parseFloat(num1), parseFloat(num2), operation);
      console.log(`Result: ${result}`);
      rl.close();
    });
  });
});
