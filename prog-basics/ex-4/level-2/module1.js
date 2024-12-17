const debug = require('debug')('myApp:module1');

function someFunction() {
  debug('This is a debug message from module 1');
}

someFunction();
module.exports = { someFunction };
