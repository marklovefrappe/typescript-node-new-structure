import { ZodError } from "zod";
import * as ErrorType from "../types/utils/error.type";
import { JsonWebTokenError } from "jsonwebtoken";

export class CustomError extends Error {
  description: string;
  statusCode: ErrorType.StatusCode;

  constructor(
    message: string,
    description = "",
    statusCode: ErrorType.StatusCode = 400,
  ) {
    super();
    Error.captureStackTrace(this, this.constructor);

    this.name = "CustomError";
    this.message = message;
    this.description = description;
    this.statusCode = statusCode;
  }
}

export const errorHandler = (error: unknown): ErrorType.ErrorObj => {
  let statusCode: ErrorType.StatusCode = 500;
  let errorCode: string = "server.error.internal_error";
  let errorDescription: string = "Unknown internal server error";

  if (error instanceof CustomError) {
    statusCode = error.statusCode;
    errorCode = error.message;
    errorDescription = error.description;
  }

  if (error instanceof ZodError) {
    const issue = error.issues[0];
    statusCode = 400;
    errorCode = "validator.error.invalid_parameter";
    errorDescription = issue.message;
  }

  if (error instanceof JsonWebTokenError) {
    statusCode = 404;
    errorCode = "service.error.jwt";
    errorDescription = error.message;
  }

  return {
    statusCode,
    errorResponse: {
      code: errorCode,
      description: errorDescription,
    },
  };
};
