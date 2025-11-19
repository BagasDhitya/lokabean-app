import { Router } from "express";
import { bookkeepingController } from "./bookkeeping.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";

const router = Router();

/**
 * CASHIER: create + get own
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("CASHIER"),
  bookkeepingController.create
);

router.get(
  "/own",
  authMiddleware,
  roleMiddleware("CASHIER"),
  bookkeepingController.getOwn
);

/**
 * SUPERADMIN: get all + filter
 */
router.get(
  "/",
  authMiddleware,
  roleMiddleware("SUPERADMIN"),
  bookkeepingController.getAll
);

/**
 * BOTH: cashier can view own record, superadmin all
 */
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("CASHIER", "SUPERADMIN"),
  bookkeepingController.getById
);

export default router;
