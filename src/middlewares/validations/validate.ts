import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "../../utils/http.error";

export function validate(req: Request, res: Response, next: NextFunction) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array({ onlyFirstError: true })[0];

      return next(new HttpError(400, firstError.msg));
    }

    next();
  } catch (error) {
    next(error);
  }
}
