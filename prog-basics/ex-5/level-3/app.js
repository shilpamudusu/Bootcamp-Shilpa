require('dotenv').config();  // Load .env file

const sqlite3 = require('sqlite3').verbose(); // SQLite package
const dbPath = process.env.DB_PATH || './default.db'; // Fallback to default if missing
const apiKey = process.env.API_KEY;  // API Key
const apiSecret = process.env.API_SECRET;  // API Secret

// Log a warning if API credentials are missing (without exposing them)
if (!apiKey || !apiSecret) {
  console.warn('Warning: API credentials are missing!');
}

// Database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Example API request (just a placeholder)
function connectToAPI() {
  // Do not log sensitive information (apiKey or apiSecret)
  console.log('Connecting to API...');
  // Simulate API connection logic (avoid logging sensitive credentials)
}

// Simulate API and DB configuration
connectToAPI();

// Don't log sensitive credentials
console.log('Database path:', dbPath);  // Safe to log non-sensitive info
