import { Request, Response, NextFunction } from "express";
import { User } from "../custom";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "../configs/env.configs";

async function VerifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) throw new Error("Unauthorized");

    const user = verify(token, SECRET_KEY as string);

    // console.log(user);

    if (!user) throw new Error("Unauthorized");

    req.user = user as User;

    next();
  } catch (err) {
    next(err);
  }
}

export { VerifyToken };
