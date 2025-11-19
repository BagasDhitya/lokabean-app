import { Router } from "express";
import { discountController } from "./discount.controller";
import { validate } from "../../core/zodValidation";
import {
  CreateDiscountDTO,
  UpdateDiscountDTO,
  ParamsDiscountIdDTO,
} from "./discount.dto";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";

const router = Router();

// GET boleh publik → utk menampilkan diskon ke visitor
router.get("/", discountController.getAll);

router.get(
  "/:id",
  validate(ParamsDiscountIdDTO),
  discountController.getById
);

// SUPERADMIN ONLY CRUD
router.post(
  "/",
  authMiddleware,
  roleMiddleware("SUPERADMIN"),
  validate(CreateDiscountDTO),
  discountController.create
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("SUPERADMIN"),
  validate(UpdateDiscountDTO),
  discountController.update
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("SUPERADMIN"),
  validate(ParamsDiscountIdDTO),
  discountController.delete
);

export default router;
