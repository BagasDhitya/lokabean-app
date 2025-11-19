import { Router } from "express";
import { superadminController } from "../controller/admin.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { roleMiddleware } from "../../../middlewares/role.middleware";

const router = Router();

router.use(authMiddleware, roleMiddleware("SUPERADMIN"));

router.get("/users", superadminController.getAllUsers);
router.get("/users/:id", superadminController.getUserById);
router.put("/users/:id/role", superadminController.updateRole);
router.delete("/users/:id", superadminController.deleteUser);

router.get("/dashboard", superadminController.dashboard);

export default router;
