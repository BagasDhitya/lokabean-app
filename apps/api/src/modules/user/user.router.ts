import { Router } from "express";
import { userController } from "./user.controller";
import { validate } from "../../core/zodValidation";
import { UpdateProfileDTO } from "./user.dto";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/me", authMiddleware, userController.getProfile);

router.put(
  "/me",
  authMiddleware,
  validate(UpdateProfileDTO),
  userController.updateProfile
);

export default router;
