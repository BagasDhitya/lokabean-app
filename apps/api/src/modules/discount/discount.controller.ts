import { Request, Response, NextFunction } from "express";
import { discountService } from "./discount.service";

class DiscountController {
  create(req: Request, res: Response, next: NextFunction) {
    discountService
      .createDiscount(req.body)
      .then((data) => res.status(201).json({ success: true, data }))
      .catch(next);
  }

  getAll(req: Request, res: Response, next: NextFunction) {
    discountService
      .getAll()
      .then((data) => res.json({ success: true, data }))
      .catch(next);
  }

  getById(req: Request, res: Response, next: NextFunction) {
    discountService
      .getById(req.params.id)
      .then((data) => res.json({ success: true, data }))
      .catch(next);
  }

  update(req: Request, res: Response, next: NextFunction) {
    discountService
      .updateDiscount(req.params.id, req.body)
      .then((data) => res.json({ success: true, data }))
      .catch(next);
  }

  delete(req: Request, res: Response, next: NextFunction) {
    discountService
      .deleteDiscount(req.params.id)
      .then(() =>
        res.json({ success: true, message: "Discount deleted successfully" })
      )
      .catch(next);
  }
}

export const discountController = new DiscountController();
