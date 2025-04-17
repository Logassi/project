import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { HttpError } from "../utils/http.error";
import { UnauthorizedError } from "../utils/errors/unauthorized.error";

const ErrorMiddleware: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof UnauthorizedError) {
    res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
      data: null,
    });
  }

  const status = err instanceof HttpError ? err.statusCode : 500;

  res.status(status).json({
    status,
    message: err.message || "Internal Server Error",
    data: null,
  });
};

export default ErrorMiddleware;
