import { NextFunction, Request, Response } from "express";
import { HttpException } from "./httpException";

export function errorHandler(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  return res.status(status).json({
    success: false,
    status,
    message,
  });
}
