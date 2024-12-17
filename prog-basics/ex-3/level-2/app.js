const winston = require('winston');

// Create a logger with a file transport and timestamp format
const logger = winston.createLogger({
  level: 'info',  // Default logging level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/app.log' })
  ]
});

// Example log messages
logger.info('This is an info message');
logger.error('This is an error message');
