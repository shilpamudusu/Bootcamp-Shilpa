const config = require('config');  // Load config package

// Access configuration values
const appName = config.get('app.name');
const appPort = config.get('app.port');
const dbHost = config.get('database.host');
const dbPort = config.get('database.port');

// Use the configuration values in your program
console.log(`Application: ${appName}`);
console.log(`App is running on port: ${appPort}`);
console.log(`Database host: ${dbHost}`);
console.log(`Database port: ${dbPort}`);
