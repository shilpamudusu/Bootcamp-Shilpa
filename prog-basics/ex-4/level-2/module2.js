const debug = require('debug')('myApp:module2');

function someFunction() {
  debug('This is a debug message from module 2');
}

someFunction();
module.exports = { someFunction };
