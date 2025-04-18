import { Request, Response, NextFunction } from "express";
import { User } from "../custom";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "../configs/env.configs";
import { UnauthorizedError } from "../utils/errors/unauthorized.error";

async function VerifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token)
      throw new UnauthorizedError("Token tidak valid atau kadaluwarsa");

    const user = verify(token, SECRET_KEY as string);

    // console.log(`test`);

    if (!user)
      throw new UnauthorizedError("Token tidak valid atau kadaluwarsa");

    req.user = user as User;

    next();
  } catch (err) {
    if (err instanceof Error && err.name === "JsonWebTokenError") {
      return next(new UnauthorizedError("Token tidak valid atau kadaluwarsa"));
    }
    if (err instanceof Error && err.name === "TokenExpiredError") {
      return next(new UnauthorizedError("Token telah kadaluwarsa"));
    }
    next(err);
  }
}

export { VerifyToken };
