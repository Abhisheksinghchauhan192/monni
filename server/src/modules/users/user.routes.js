import express from "express";
import {
  updateProfileController,
  changePasswordController,
  deleteAccountController,
  getUserSettingsController,
  updateUserSettingsController,
  updateProfilePhotoController,
} from "./user.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

import { validateBody } from "../../validators/validate.js";

import {
  updateProfileSchema,
  deleteAccountSchema,
  changePasswordSchema,
} from "../../validators/users/user.update.schema.js";
import { updateSettingsSchema } from "../../validators/users/userSettings.schema.js";
import { upload } from "../../middlewares/upload.js";

const router = express.Router();

// User Profile ,Password and Account Deletion Routes
router.patch(
  "/profile",
  authMiddleware,
  validateBody(updateProfileSchema),
  updateProfileController,
);

// user profilee photo updation route.
router.post(
  "/profile/photo",
  authMiddleware,
  upload.single("photo"),
  updateProfilePhotoController,
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

// Update User Personalization settings routes
router.get(`/settings`, authMiddleware, getUserSettingsController);

router.patch(
  "/settings",
  authMiddleware,
  validateBody(updateSettingsSchema),
  updateUserSettingsController,
);

export default router;
