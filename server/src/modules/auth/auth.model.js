import pool from "../../config/database.js";

// Get user Basic Information
export async function getUserBasicDetails(userId){
  const[[row]] = await pool.query(
    "SELECT  name,email,profile_image,mobile  FROM users WHERE id=?",[userId],
  );
  return row;
}