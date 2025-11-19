import { Request, Response, NextFunction } from "express";
import { bookkeepingService } from "./bookkeeping.service";

class BookkeepingController {
  create(req: Request, res: Response, next: NextFunction) {
    const cashierId = req.user?.id as string;

    bookkeepingService
      .create(cashierId, req.body)
      .then((data) => res.status(201).json({ success: true, data }))
      .catch(next);
  }

  getOwn(req: Request, res: Response, next: NextFunction) {
    const cashierId = req.user?.id as string;

    bookkeepingService
      .getOwn(cashierId)
      .then((data) => res.json({ success: true, data }))
      .catch(next);
  }

  getAll(req: Request, res: Response, next: NextFunction) {
    bookkeepingService
      .getAll(req.query)
      .then((data) => res.json({ success: true, data }))
      .catch(next);
  }

  getById(req: Request, res: Response, next: NextFunction) {
    const userId = req.user?.id as string;
    const role = req.user?.role as string;

    bookkeepingService
      .getById(req.params.id, userId, role)
      .then((data) => res.json({ success: true, data }))
      .catch(next);
  }
}

export const bookkeepingController = new BookkeepingController();
