import { Router } from "express";
import { authController } from "./auth.controller";
import { validate } from "../../core/zodValidation";
import { RegisterDTO, LoginDTO } from "./auth.dto";

const router = Router();

router.post("/register", validate(RegisterDTO), authController.registerVisitor);
router.post("/login", validate(LoginDTO), authController.login);
router.post("/reset-password", authController.resetPassword);

export default router;
