import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/http.error";

export default function ErrorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err instanceof HttpError ? err.statusCode : 500;

  res.status(status).json({
    status,
    message: err.message || "Internal Server Error",
    data: null,
  });
}
