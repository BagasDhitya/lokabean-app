import { Request, Response, NextFunction } from "express";
import { userService } from "./user.service";

class UserController {
  getProfile(req: Request, res: Response, next: NextFunction) {
    const userId = req.user?.id;

    userService
      .getProfile(userId as string)
      .then((data) => res.json({ success: true, data }))
      .catch(next);
  }

  updateProfile(req: Request, res: Response, next: NextFunction) {
    const userId = req.user?.id;

    userService
      .updateProfile(userId as string, req.body)
      .then((data) => res.json({ success: true, data }))
      .catch(next);
  }
}

export const userController = new UserController();
