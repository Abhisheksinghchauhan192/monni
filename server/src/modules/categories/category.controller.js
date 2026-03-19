import asyncHandler from "../../utils/asyncHandler.js";
import {
  fetchCategories,
  addCategory,
  editCategory,
  removeCategory,
} from "./category.service.js";

export const getCategoriesController = asyncHandler(async (req, res) => {
  const data = await fetchCategories(req.user.id);

  res.json({
    success: true,
    data: { categories: data },
  });
});

export const createCategoryController = asyncHandler(async (req, res) => {
  const { name, emoji } = req.body;

  const category = await addCategory(req.user.id, name, emoji);

  res.status(201).json({
    success: true,
    message: "Category created",
    data: category,
  });
});

export const updateCategoryController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await editCategory(req.user.id, id, req.body);

  res.json({
    success: true,
    message: "Category updated",
  });
});

export const deleteCategoryController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await removeCategory(req.user.id, id);

  res.json({
    success: true,
    message: "Category removed",
  });
});
