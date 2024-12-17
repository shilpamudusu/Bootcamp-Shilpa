require('dotenv').config();  // Load .env file

// Function to get environment variables with fallback and logging
function getEnvVariable(variable, defaultValue) {
  const value = process.env[variable];
  if (!value) {
    console.warn(`Warning: Missing environment variable: ${variable}. Using default value: ${defaultValue}`);
    return defaultValue;
  }
  return value;
}

// Access environment variables with fallback values
const port = getEnvVariable('PORT', 3000);
const dbHost = getEnvVariable('DB_HOST', 'localhost');

// Output the values
console.log(`App is running on port ${port}`);
console.log(`Connecting to DB at ${dbHost}`);
