import { Request, Response, NextFunction } from "express";
import { AdminUserService } from "../service/user.service";
import { AnalyticsService } from "../service/analytic.service";

class SuperadminController {
  private adminUserService: AdminUserService
  private analyticsService: AnalyticsService

  constructor(){
    this.adminUserService = new AdminUserService()
    this.analyticsService = new AnalyticsService()
  }

  getAllUsers(req: Request, res: Response, next: NextFunction) {
    this.adminUserService
      .getAllUsers()
      .then((data) => res.json({ success: true, data }))
      .catch(next);
  }

  getUserById(req: Request, res: Response, next: NextFunction) {
    this.adminUserService
      .getUserById(req.params.id)
      .then((data) => res.json({ success: true, data }))
      .catch(next);
  }

  updateRole(req: Request, res: Response, next: NextFunction) {
    this.adminUserService
      .updateRole(req.params.id, req.body)
      .then((data) => res.json({ success: true, data }))
      .catch(next);
  }

  deleteUser(req: Request, res: Response, next: NextFunction) {
    this.adminUserService
      .deleteUser(req.params.id)
      .then((data) => res.json({ success: true, data }))
      .catch(next);
  }

  dashboard(req: Request, res: Response, next: NextFunction) {
    this.analyticsService
      .dashboard()
      .then((data) => res.json({ success: true, data }))
      .catch(next);
  }
}

export const superadminController = new SuperadminController();
