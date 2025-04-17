import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "../../utils/http.error";

export function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array()[0].msg;
    return next(new HttpError(400, firstError));
  }
  next();
}
