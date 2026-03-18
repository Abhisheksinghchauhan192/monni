import express from "express";
import {
  updateProfileController,
  changePasswordController,
  deleteAccountController,
} from "./user.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

import { validateBody } from "../../validators/validate.js";

import {
  updateProfileSchema,
  deleteAccountSchema,
  changePasswordSchema,
} from "../../validators/users/user.update.schema.js";

const router = express.Router();

router.patch(
  "/profile",
  authMiddleware,
  validateBody(updateProfileSchema),
  updateProfileController,
);

router.patch(
  "/password",
  authMiddleware,
  validateBody(changePasswordSchema),
  changePasswordController,
);

router.delete(
  "/account",
  authMiddleware,
  validateBody(deleteAccountSchema),
  deleteAccountController,
);

export default router;
