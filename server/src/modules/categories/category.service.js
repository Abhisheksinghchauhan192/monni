import {
    getCategories,
    createCategory,
    findCategory,
    countUserCategories,
    updateCategory,
    deactivateCategory,
    updateExpensesCategory,
    reactivateCategory,
}from "./category.model.js"

import ApiError from "../../errors/ApiError.js";

const MAX_CUSTOM = 10;

export async function fetchCategories(userId) {
  return await getCategories(userId);
}

// CREATE
export async function addCategory(userId, name, emoji) {
  const count = await countUserCategories(userId);

  if (count >= MAX_CUSTOM) {
    throw new ApiError(400, "Custom category limit reached");
  }

  const exists = await findCategory(userId, name);

  if (exists) {
    if (exists.is_active) {
      throw new ApiError(400, "Category already exists");
    }

    // revive instead of creating
    await reactivateCategory(exists.id, emoji);

    return {
      id: exists.id,
      name,
      emoji,
      revived: true,
      userId:userId,
    };
  }

  const id = await createCategory(userId, name, emoji);

  return { id, name, emoji };
}

// UPDATE
export async function editCategory(userId, categoryId, data) {
  if (data.name) {
    const normalized = data.name.trim().toLowerCase();

    const exists = await findCategory(userId, normalized);

    if (exists && exists.id != categoryId) {
      throw new ApiError(400, "Category already exists");
    }

    data.name = normalized;
  }

  const categories = await getCategories(userId);
  const current = categories.find((c) => c.id == categoryId);

  if (!current) {
    throw new ApiError(404, "Category not found");
  }

  await updateCategory(categoryId, userId, data);

  if (data.name && data.name !== current.name) {
    await updateExpensesCategory(userId, current.name, data.name);
  }

  return true;
}

// DELETE (soft)
export async function removeCategory(userId, categoryId) {
  const success = await deactivateCategory(categoryId, userId);

  if (!success) {
    throw new ApiError(404, "Category not found or not allowed");
  }

  return true;
}