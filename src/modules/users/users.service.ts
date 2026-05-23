import { pool } from "../../database";

/* =========================
   GET ALL USERS
========================= */
export const getAllUsersService = async () => {
  const result = await pool.query(
    `SELECT id, name, email, role, created_at, updated_at FROM users`
  );

  return result.rows;
};

/* =========================
   GET SINGLE USER
========================= */
export const getSingleUserService = async (id: number) => {
  const result = await pool.query(
    `SELECT id, name, email, role, created_at, updated_at
     FROM users
     WHERE id = $1`,
    [id]
  );

  if (!result.rows.length) {
    throw new Error("User not found");
  }

  return result.rows[0];
};