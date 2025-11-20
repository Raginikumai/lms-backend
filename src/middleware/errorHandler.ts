import { type Request, type Response, type NextFunction } from 'express';
import { ZodError, z } from 'zod';
import { Prisma } from '@prisma/client';
import logger from '../config/logger';
import { ENV } from '../config/env';

/**
 * A custom error class for handling specific API errors with a status code.
 * Use this when you want to deliberately throw an error with a specific HTTP status.
 * Example: throw new ApiError(404, 'User not found');
 */
export class ApiError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

/**
 * The global error handling middleware for the Express application.
 * It catches all errors passed to `next()` and sends a consistent, formatted JSON response.
 * This middleware MUST be the last `app.use()` call in your app's configuration.
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction, // `next` is required for Express to recognize this as an error handler
): void => {
  // Set default values for the error response
  let statusCode = 500;
  let message = 'An unexpected internal server error occurred.';

  // --- Handle Specific, Known Error Types ---

  if (err instanceof ApiError) {
    // Use the status code and message from our custom error
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof ZodError) {
    // Handle validation errors from Zod
    statusCode = 400; // Bad Request
    const flattenedErrors = z.treeifyError(err)
    // Format the Zod error messages into a single, readable string
    message = flattenedErrors.errors.map((e: any) => `${e.path.join('.')}: ${e.message}`).join(', ');
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle known errors from Prisma (e.g., unique constraint violations)
    switch (err.code) {
      case 'P2002': // Unique constraint failed
        // Example: "Unique constraint failed on the fields: (`email`)"
        const fields = (err.meta?.target as string[])?.join(', ');
        message = `A record with this ${fields} already exists.`;
        statusCode = 409; // Conflict
        break;
      case 'P2025': // Record to update or delete not found
        message = 'The requested resource was not found.';
        statusCode = 404; // Not Found
        break;
      default:
        // For other Prisma errors, use a generic database error message
        message = 'A database error occurred.';
        statusCode = 500;
        break;
    }
  }

  // --- Logging ---
  // Log the full error details for debugging purposes, especially in production
  logger.error(err.message, {
    statusCode,
    stack: err.stack, // The stack trace is crucial for finding the source of the error
    path: req.path,
    method: req.method,
  });

  // --- Final JSON Response ---
  // Create the response object
  const response = {
    success: false,
    message,
    // Only include the stack trace in the response during development
    stack: ENV.NODE_ENV === 'development' ? err.stack : undefined,
  };

  res.status(statusCode).json(response);
};