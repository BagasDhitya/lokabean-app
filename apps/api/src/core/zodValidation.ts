import { ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: parsed.error.issues,
      });
    }
    next();
  };
