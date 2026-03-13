import pool from "../../config/database.js";

export async function findPendingByEmail(email) {
  const [rows] = await pool.query(
    `SELECT * FROM pending_registrations WHERE email = ?`,
    [email]
  );

  return rows[0] || null;
}

export async function createOrUpdatePending({
  email,
  name,
  passwordHash,
  otpHash,
  expiresAt,
}) {
  await pool.query(
    `
    INSERT INTO pending_registrations 
      (email, name, password_hash, otp_hash, expires_at)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      password_hash = VALUES(password_hash),
      otp_hash = VALUES(otp_hash),
      expires_at = VALUES(expires_at),
      attempts = 0
    `,
    [email, name, passwordHash, otpHash, expiresAt]
  );
}

export async function incrementAttempts(email) {
  await pool.query(
    `UPDATE pending_registrations 
     SET attempts = attempts + 1 
     WHERE email = ?`,
    [email]
  );
}

export async function deletePending(email) {
  await pool.query(
    `DELETE FROM pending_registrations WHERE email = ?`,
    [email]
  );
}