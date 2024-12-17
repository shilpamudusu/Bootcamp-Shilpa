// mathutils.js

// Function to add numbers
function add(numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
  }
  
  // Function to multiply numbers
  function multiply(numbers) {
    return numbers.reduce((product, num) => product * num, 1);
  }
  
  // Export functions
  module.exports = { add, multiply };
  