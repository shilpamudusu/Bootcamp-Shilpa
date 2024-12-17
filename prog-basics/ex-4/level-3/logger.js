const winston = require('winston');

// Create a logger with different transports and formats
const logger = winston.createLogger({
  level: 'info',  // Minimum level to log
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({ filename: 'app.log' })
  ]
});

module.exports = logger;
