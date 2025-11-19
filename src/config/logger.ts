// src/config/logger.ts
import winston from 'winston';
import { toUpperCase } from 'zod';

// Define your custom log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// This method sets the current severity based on the current NODE_ENV
// If we're in development, we want to see all the logs.
// If we're in production, we only want to see warn and error logs.
const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

// Define different colors for each level.
// Colors are only applied in development environment.
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

// Tell winston that you want to link the colors
winston.addColors(colors);

// Chose the aspect of your log customizing the format.
const format = winston.format.combine(
  // Add the message timestamp with the preferred format
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  // Define the format of the message showing the timestamp, the level and the message
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`,
  ),
  // Tell Winston that the logs must be colored
  winston.format.colorize({ all: true }),
);

// Define which transports the logger must use to print out messages.
// In this example, we are using a single transport — the console.
const transports = [
  new winston.transports.Console(),
  // In a production environment, you would also add a file transport
  // or a transport for a cloud logging service.
  // new winston.transports.File({
  //   filename: 'logs/error.log',
  //   level: 'error',
  // }),
  // new winston.transports.File({ filename: 'logs/all.log' }),
];

// Create the logger instance that has to be exported
// and used to log messages.
const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default logger;