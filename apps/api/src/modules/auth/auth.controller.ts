import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service";

class AuthController {
  registerVisitor(req: Request, res: Response, next: NextFunction) {
    authService
      .registerVisitor(req.body)
      .then((data) => res.status(201).json({ success: true, data }))
      .catch(next);
  }

  login(req: Request, res: Response, next: NextFunction) {
    authService
      .login(req.body.email, req.body.password)
      .then((data) => res.json({ success: true, data }))
      .catch(next);
  }

  resetPassword(req: Request, res: Response, next: NextFunction) {
    authService
      .resetPassword(req.body.email, req.body.newPassword)
      .then((data) => res.json({ success: true, data }))
      .catch(next);
  }
}

export const authController = new AuthController();
