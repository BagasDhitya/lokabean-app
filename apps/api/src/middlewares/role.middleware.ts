import { Request, Response, NextFunction } from "express";
import { HttpException } from "../core/httpException";

export function roleMiddleware(...roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) throw new HttpException(401, "Unauthorized");

    if (!roles.includes(req.user.role)) {
      throw new HttpException(403, "Forbidden: insufficient role");
    }

    next();
  };
}
