require('dotenv').config();  // Loads the .env file

// Access the environment variables
const port = process.env.PORT || 3000;
const dbHost = process.env.DB_HOST || 'localhost';

console.log(`App is running on port ${port}`);
console.log(`Connecting to DB at ${dbHost}`);
