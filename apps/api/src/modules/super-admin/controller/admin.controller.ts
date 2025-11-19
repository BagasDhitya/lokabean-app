import { Request, Response, NextFunction } from "express";
import { adminUserService } from "../service/user.service";
import { analyticsService } from "../service/analytic.service";

class SuperadminController {
  getAllUsers(req: Request, res: Response, next: NextFunction) {
    adminUserService
      .getAllUsers()
      .then((data) => res.json({ success: true, data }))
      .catch(next);
  }

  getUserById(req: Request, res: Response, next: NextFunction) {
    adminUserService
      .getUserById(req.params.id)
      .then((data) => res.json({ success: true, data }))
      .catch(next);
  }

  updateRole(req: Request, res: Response, next: NextFunction) {
    adminUserService
      .updateRole(req.params.id, req.body)
      .then((data) => res.json({ success: true, data }))
      .catch(next);
  }

  deleteUser(req: Request, res: Response, next: NextFunction) {
    adminUserService
      .deleteUser(req.params.id)
      .then((data) => res.json({ success: true, data }))
      .catch(next);
  }

  dashboard(req: Request, res: Response, next: NextFunction) {
    analyticsService
      .dashboard()
      .then((data) => res.json({ success: true, data }))
      .catch(next);
  }
}

export const superadminController = new SuperadminController();
