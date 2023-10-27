const errorResponse = require("../../response/error-response.js");
const db = require("../../application/config.js");

const updateStatus = (req, res, next) => {
  if (req.query.stat === "nonaktif") {
    const data = req.tokenDecode;

    if (!data) return errorResponse(401, "Invalid token", "Unauthorized", res);

    if (data.role === "Karyawan") {
      return errorResponse(403, "Access denied", "Forbidden", res);
    }

    if (data.role === "Supervisor") {
      const sql = `UPDATE users SET status_user = ? WHERE id = ? AND id_role = 'KRY'`;
      db.query(sql, [req.query.stat, req.query.id], (err, result) => {
        if (err) return errorResponse(500, err.message, res);

        if (result.affectedRows === 0) {
          return errorResponse(400, "Cannot deactivate user", "Bad request", res);
        }

        next();
      });
    }

    if (data.role === "Superadmin") {
      const sql = `UPDATE users SET status_user = ? WHERE id = ? AND id_role != 'SU'`;
      db.query(sql, [req.query.stat, req.query.id], (err, result) => {
        if (err) return errorResponse(500, err.message, "Internal server error", res);

        if (result.affectedRows === 0) {
          return errorResponse(400, "Cannot deactivate user", "Bad request", res);
        }
        next();
      });
    }
  }

  if (req.query.stat === "aktif") {
    const data = req.tokenDecode;

    if (!data) return errorResponse(401, "Invalid token", "Unauthorized", res);

    if (data.role === "Karyawan")
      return errorResponse(403, "Access denied", "Forbidden", res);

    if (data.role === "Supervisor") {
      const sql = `UPDATE users SET status_user = ? WHERE id = ? AND id_role = 'KRY'`;
      db.query(sql, [req.query.stat, req.query.id], (err, result) => {
        if (err) return errorResponse(500, err.message, "Internal server error", res);

        if (result.affectedRows === 0) {
          return errorResponse(400, "Cannot activate user", "Bad request", res);
        }

        next();
      });
    }

    if (data.role === "Superadmin") {
      const sql = `UPDATE users SET status_user = ? WHERE ? && id_role != 'SU'`;
      db.query(sql, [req.query.stat, req.query.id], (err, result) => {
        if (err) return errorResponse(500, err.message, "Internal server error", res);

        if (result.affectedRows === 0) {
          return errorResponse(400, "Cannot activate user", "Bad request", res);
        }
        next();
      });
    }
  }
};

module.exports = updateStatus;
