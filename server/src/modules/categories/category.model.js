import pool from "../../config/database.js";

const normalize = (name) => name.trim().toLowerCase();

// GET categories
export async function getCategories(userId) {
  const [rows] = await pool.query(
    `
    SELECT id, name, normalized_name, emoji, user_id
    FROM categories
    WHERE (user_id IS NULL OR user_id = ?)
      AND is_active = TRUE
    ORDER BY user_id IS NULL DESC, name ASC
    `,
    [userId]
  );

  return rows;
}

// FIND category (duplicate check)
export async function findCategory(userId, name) {
  const normalized = normalize(name);

  const [rows] = await pool.query(
    `
    SELECT id, is_active FROM categories
    WHERE normalized_name = ?
      AND (user_id = ? OR user_id IS NULL)
    `,
    [normalized, userId]
  );

  return rows[0] || null;
}


// CREATE
export async function createCategory(userId, name, emoji) {
  const normalized = normalize(name);

  const [result] = await pool.query(
    `
    INSERT INTO categories (user_id, name, normalized_name, emoji)
    VALUES (?, ?, ?, ?)
    `,
    [userId, name.trim(), normalized, emoji || "🏷️"]
  );

  return result.insertId;
}

// COUNT custom categories
export async function countUserCategories(userId) {
  const [rows] = await pool.query(
    `
    SELECT COUNT(*) as count
    FROM categories
    WHERE user_id = ? AND is_active = TRUE
    `,
    [userId]
  );

  return rows[0].count;
}

// UPDATE category
export async function updateCategory(categoryId, userId, data) {
  const fields = [];
  const values = [];

  if (data.name) {
    fields.push("name = ?");
    values.push(data.name.trim());

    fields.push("normalized_name = ?");
    values.push(normalize(data.name));
  }

  if (data.emoji) {
    fields.push("emoji = ?");
    values.push(data.emoji);
  }

  if (!fields.length) return;

  values.push(categoryId, userId);

  await pool.query(
    `
    UPDATE categories
    SET ${fields.join(", ")}
    WHERE id = ? AND user_id = ?
    `,
    values
  );
}

// SOFT DELETE
export async function deactivateCategory(categoryId, userId) {
  const [result] = await pool.query(
    `
    UPDATE categories
    SET is_active = FALSE
    WHERE id = ? AND user_id = ?
    `,
    [categoryId, userId]
  );

  return result.affectedRows > 0;
}

// UPDATE EXPENSES (rename sync)
export async function updateExpensesCategory(userId, oldName, newName) {
  await pool.query(
    `
    UPDATE expenses
    SET category = ?
    WHERE user_id = ? AND LOWER(category) = ?
    `,
    [newName, userId, normalize(oldName)]
  );
}

//Reactivate Category

export async function reactivateCategory(id, emoji) {
  await pool.query(
    `
    UPDATE categories
    SET is_active = TRUE,
        emoji = ?
    WHERE id = ?
    `,
    [emoji || "🏷️", id]
  );
}