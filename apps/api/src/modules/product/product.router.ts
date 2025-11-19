import { Router } from "express";
import { productController } from "./product.controller";
import { validate } from "../../core/zodValidation";
import {
  CreateProductDTO,
  UpdateProductDTO,
  ParamsProductIdDTO,
} from "./product.dto";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";

const router = Router();

// SUPERADMIN ONLY
router.post(
  "/",
  authMiddleware,
  roleMiddleware("SUPERADMIN"),
  validate(CreateProductDTO),
  productController.create
);

router.get("/", productController.getAll);

router.get("/:id", validate(ParamsProductIdDTO), productController.getById);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("SUPERADMIN"),
  validate(UpdateProductDTO),
  productController.update
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("SUPERADMIN"),
  validate(ParamsProductIdDTO),
  productController.delete
);

export default router;
