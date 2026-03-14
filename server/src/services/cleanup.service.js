import pool from "../config/database.js";
import logger from "../utils/logger.js";

export async function cleanupExpiredRegistrations() {
  try {
     const [result] = await pool.query(
      `DELETE FROM pending_registrations WHERE expires_at < NOW()`
    );

    if (result.affectedRows > 0) {
      logger.info(`Cleaned ${result.affectedRows} expired pending registrations`);
    }
  } catch (error) {
    logger.error("Cleanup job failed", error);
  }
}