import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";

import {
  getCategoriesController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from "./category.controller.js";

import { validateBody } from "../../validators/validate.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../../validators/categories/categories.schema.js";

const router = express.Router();

router.get("/", authMiddleware, getCategoriesController);

router.post(
  "/",
  authMiddleware,
  validateBody(createCategorySchema),
  createCategoryController
);

router.patch(
  "/:id",
  authMiddleware,
  validateBody(updateCategorySchema),
  updateCategoryController
);

router.delete("/:id", authMiddleware, deleteCategoryController);

export default router;