import { pool } from "../../database";
import type { ICreateIssue, IUpdateIssue } from "./issues.interface";

/* =========================
   CREATE ISSUE
========================= */
export const createIssueService = async (
  payload: ICreateIssue,
  userId: number
) => {
  const { title, description, type } = payload;

  const result = await pool.query(
    `INSERT INTO issues (title, description, type, reporter_id)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [title, description, type, userId]
  );

  return result.rows[0];
};

/* =========================
   GET ALL ISSUES
========================= */
export const getAllIssuesService = async (query: {
  sort?: string;
  type?: string;
  status?: string;
}) => {
  let baseQuery = "SELECT * FROM issues WHERE 1=1";
  const values: any[] = [];
  let count = 1;

  if (query.type) {
    baseQuery += ` AND type = $${count}`;
    values.push(query.type);
    count++;
  }

  if (query.status) {
    baseQuery += ` AND status = $${count}`;
    values.push(query.status);
    count++;
  }

  baseQuery +=
    query.sort === "oldest"
      ? " ORDER BY created_at ASC"
      : " ORDER BY created_at DESC";

  const issuesResult = await pool.query(baseQuery, values);
  const issues = issuesResult.rows;

  // fetch reporters separately (NO JOIN RULE)
  const reporterIds = [...new Set(issues.map((i) => i.reporter_id))];

  let usersMap = new Map();

  if (reporterIds.length > 0) {
    const usersResult = await pool.query(
      `SELECT id, name, role FROM users WHERE id = ANY($1)`,
      [reporterIds]
    );

    usersMap = new Map(usersResult.rows.map((u) => [u.id, u]));
  }

  return issues.map((issue) => ({
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter: usersMap.get(issue.reporter_id) || null,
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  }));
};

/* =========================
   GET SINGLE ISSUE
========================= */
export const getSingleIssueService = async (id: number) => {
  const issueResult = await pool.query(
    "SELECT * FROM issues WHERE id = $1",
    [id]
  );

  if (!issueResult.rows.length) {
    throw new Error("Issue not found");
  }

  const issue = issueResult.rows[0];

  const userResult = await pool.query(
    "SELECT id, name, role FROM users WHERE id = $1",
    [issue.reporter_id]
  );

  return {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter: userResult.rows[0] || null,
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  };
};

/* =========================
   UPDATE ISSUE
========================= */
export const updateIssueService = async (
  id: number,
  payload: IUpdateIssue & {
    status?: "open" | "in_progress" | "resolved";
  },
  user: { id: number; role: string }
) => {
  const issueRes = await pool.query(
    "SELECT * FROM issues WHERE id = $1",
    [id]
  );

  if (!issueRes.rows.length) {
    throw new Error("Issue not found");
  }

  const issue = issueRes.rows[0];

  // =========================
  // CONTRIBUTOR RESTRICTION
  // =========================
  if (user.role === "contributor") {
    if (issue.reporter_id !== user.id) {
      throw new Error("Not allowed to update this issue");
    }

    if (issue.status !== "open") {
      throw new Error("Cannot update non-open issues");
    }

    if (payload.status) {
      throw new Error("Contributors cannot change status");
    }
  }

  // =========================
  // UPDATE QUERY
  // =========================
  const updated = await pool.query(
    `UPDATE issues
     SET 
       title = COALESCE($1, title),
       description = COALESCE($2, description),
       type = COALESCE($3, type),
       status = COALESCE($4, status),
       updated_at = NOW()
     WHERE id = $5
     RETURNING *`,
    [
      payload.title,
      payload.description,
      payload.type,
      user.role === "maintainer" ? payload.status : issue.status,
      id,
    ]
  );

  return updated.rows[0];
};
/* =========================
   DELETE ISSUE
========================= */
export const deleteIssueService = async (id: number) => {
  const result = await pool.query(
    "DELETE FROM issues WHERE id = $1 RETURNING *",
    [id]
  );

  if (!result.rows.length) {
    throw new Error("Issue not found");
  }

  return true;
};