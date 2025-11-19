import { Router } from "express";
import { transactionController } from "./transaction.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";

const router = Router();

/**
 * Visitor / Cashier create transaction
 */
router.post("/", authMiddleware, transactionController.create);

/**
 * All roles can read own transaction
 * Superadmin can read all
 */
router.get(
  "/",
  authMiddleware,
  roleMiddleware("SUPERADMIN"),
  transactionController.getAll
);

router.get("/:id", authMiddleware, transactionController.getById);

/**
 * Update status (usually Midtrans webhook or Superadmin)
 */
router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("SUPERADMIN"),
  transactionController.updateStatus
);

export default router;
