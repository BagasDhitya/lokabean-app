import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { HttpException } from "../core/httpException";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bearer = req.headers.authorization;

  if (!bearer) throw new HttpException(401, "Unauthorized");

  const token = bearer.split(" ")[1];

  if (!token) throw new HttpException(401, "Invalid token");

  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (err) {
    throw new HttpException(401, "Token verification failed");
  }
}
