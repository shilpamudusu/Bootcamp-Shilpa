// app.js
const debug = require('debug')('myApp:exampleModule');

function someFunction() {
  debug('This function is running');
  let result = 42;
  debug('Result is: %d', result);
}

someFunction();
