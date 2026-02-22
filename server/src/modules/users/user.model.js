import pool from "../../config/database.js";
import crypto from "crypto";

export async function createUser({ name, email, passwordHash }) {
  const publicId = crypto.randomUUID();
  const [result] = await pool.query(
    `INSERT INTO users (public_id,name,email,password_hash) VALUES (?,?,?,?)`,
    [publicId, name, email, passwordHash],
  );

  return {
    id: result.insertId,
    publicId,
  };
}

export async function findUserByEmail(email) {
  const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [
    email,
  ]);

  return rows[0] || null;
}

export async function findUserById(id) {
  const [rows] = await pool.query(
    `SELECT id, public_id, name, email, mobile, profile_image, is_verified
     FROM users WHERE id = ?`,
    [id],
  );

  return rows[0] || null;
}

export async function updateUserProfile(id, data) {
  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(data)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }
  if (fields.length === 0) return;
  values.push(id);

  const query = `
    UPDATE users SET
    ${fields.join(", ")}
    WHERE id = ?
    `;

  await pool.query(query, values);
}

// Password reseting logic
export async function saveResetToken(id, hashedToken, expiresAt) {
  await pool.query(
    `
    UPDATE users
    SET reset_token = ?, reset_token_expires = ?
    WHERE id = ?
    `,
    [hashedToken, expiresAt, id],
  );
}

export async function findUserByResetToken(hashedToken) {
  const [rows] = await pool.query(
    `
    SELECT id, email
    FROM users
    WHERE reset_token = ?
      AND reset_token_expires > NOW()
    `,
    [hashedToken],
  );

  return rows[0] || null;
}

export async function updateUserPassword(id, passwordHash) {
  await pool.query(
    `
    UPDATE users
    SET password_hash = ?
    WHERE id = ?
    `,
    [passwordHash, id],
  );
}

export async function clearResetToken(id) {
  await pool.query(
    `
    UPDATE users
    SET reset_token = NULL,
        reset_token_expires = NULL
    WHERE id = ?
    `,
    [id],
  );
}