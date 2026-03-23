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
// User Utility function
export async function findUserByEmail(email) {
  const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [
    email,
  ]);

  return rows[0] || null;
}
// User Utility function
export async function findUserById(id) {
  const [rows] = await pool.query(
    `SELECT id, public_id, name, email, mobile, profile_image,profile_image_id, is_verified
     FROM users WHERE id = ?`,
    [id],
  );

  return rows[0] || null;
}
// User Utility Function
export async function findPasswordHashById(id) {
  const [rows] = await pool.query(
    `
    SELECT password_hash FROM users WHERE id = ?

    `
    , [id]);

  return rows[0] || null;
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

// Password reset Helper
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

// Password reset utility function
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

// ------------------------------------------------------------
// User Updation Implimentation  .....

// Update Profile Image,Name,Profile picture.
export async function updateUserProfile(id, data) {
  const allowedFields = ["name", "mobile", "profile_image","profile_image_id"];

  const fields = [];
  const values = [];

  for (const key of allowedFields) {
    if (data[key] !== undefined) {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }
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

// update user password
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

// delete user Account
export async function deleteUserAccount(userId) {
  await pool.query(
    `
    DELETE FROM  users  WHERE id = ?
    `,
    [userId],
  );
}

//--------------------------------------------------------------
// Users Personalization Settings 
//--------------------------------------------------------------

// Get settings
export async function getUserSettings(userId) {
  const [rows] = await pool.query(
    `SELECT currency, timezone, theme
     FROM user_settings
     WHERE user_id = ?`,
    [userId]
  );

  return rows[0] || null;
}

// Create default settings (on first access)
export async function createUserSettings(userId) {
  await pool.query(
    `INSERT INTO user_settings (user_id) VALUES (?)`,
    [userId]
  );
}

// Update settings
export async function updateUserSettings(userId, data) {
  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(data)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }

  if (fields.length === 0) return;

  values.push(userId);

  const query = `
    UPDATE user_settings
    SET ${fields.join(", ")}
    WHERE user_id = ?
  `;

  await pool.query(query, values);
}