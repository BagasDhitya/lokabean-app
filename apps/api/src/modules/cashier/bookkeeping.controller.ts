import { Request, Response, NextFunction } from "express";
import { BookkeepingService } from "./bookkeeping.service";

class BookkeepingController {
  private bookKeepingService: BookkeepingService;

  constructor() {
    this.bookKeepingService = new BookkeepingService();
  }
  create(req: Request, res: Response, next: NextFunction) {
    const cashierId = req.user?.id as string;

    this.bookKeepingService
      .create(cashierId, req.body)
      .then((data) => res.status(201).json({ success: true, data }))
      .catch(next);
  }

  getOwn(req: Request, res: Response, next: NextFunction) {
    const cashierId = req.user?.id as string;

    this.bookKeepingService
      .getOwn(cashierId)
      .then((data) => res.json({ success: true, data }))
      .catch(next);
  }

  getAll(req: Request, res: Response, next: NextFunction) {
    this.bookKeepingService
      .getAll(req.query)
      .then((data) => res.json({ success: true, data }))
      .catch(next);
  }

  getById(req: Request, res: Response, next: NextFunction) {
    const userId = req.user?.id as string;
    const role = req.user?.role as string;

    this.bookKeepingService
      .getById(req.params.id, userId, role)
      .then((data) => res.json({ success: true, data }))
      .catch(next);
  }
}

export const bookkeepingController = new BookkeepingController();
