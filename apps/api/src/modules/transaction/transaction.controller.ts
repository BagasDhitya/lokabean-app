import { Request, Response, NextFunction } from "express";
import { transactionService } from "./transaction.service";

class TransactionController {
  create(req: Request, res: Response, next: NextFunction) {
    const userId = req.user?.id as string;

    transactionService
      .create(userId, req.body)
      .then((data) => res.status(201).json({ success: true, data }))
      .catch(next);
  }

  getAll(req: Request, res: Response, next: NextFunction) {
    transactionService
      .getAll()
      .then((data) => res.json({ success: true, data }))
      .catch(next);
  }

  getById(req: Request, res: Response, next: NextFunction) {
    transactionService
      .getById(req.params.id)
      .then((data) => res.json({ success: true, data }))
      .catch(next);
  }

  updateStatus(req: Request, res: Response, next: NextFunction) {
    const { status } = req.body;

    transactionService
      .updateStatus(req.params.id, status)
      .then((data) => res.json({ success: true, data }))
      .catch(next);
  }
}

export const transactionController = new TransactionController();
