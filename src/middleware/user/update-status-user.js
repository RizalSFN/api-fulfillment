const errorResponse = require("../../response/error-response.js");
const db = require("../../application/config.js");

const updateStatus = (req, res, next) => {
  if (req.params.status == "nonaktif") {
    const data = req.tokenDecode;

    if (!data) return errorResponse(403, "Invalid token", res);

    if (data.role == "Karyawan") {
      return errorResponse(403, "Akses ditolak", res);
    }

    if (data.role == "Supervisor") {
      const sql = `UPDATE users SET status_user = ? WHERE id = ? AND id_role = 'KRY'`;
      db.query(sql, [req.params.status, req.params.id], (err, result) => {
        if (err) return errorResponse(500, "Internal server error", res);

        if (result.affectedRows == 0) {
          return errorResponse(403, "Tidak bisa menonaktifkan user", res);
        }

        next();
      });
    }

    if (data.role == "Superadmin") {
      const sql = `UPDATE users SET status_user = ? WHERE id = ? AND id_role != 'SU'`;
      db.query(sql, [req.params.status, req.params.id], (err, result) => {
        if (err) return errorResponse(500, "Internal server error", res);

        if (result.affectedRows == 0) {
          return errorResponse(403, "Tidak bisa menonaktifkan user", res);
        }
        next();
      });
    }
  }

  if (req.params.status == "aktif") {
    const data = req.tokenDecode;

    if (!data) return errorResponse(403, "Invalid token", res);

    if (data.role == "Karyawan")
      return errorResponse(403, "Akses ditolak", res);

    if (data.role == "Supervisor") {
      const sql = `UPDATE users SET status_user = ? WHERE id = ? AND id_role = 'KRY'`;
      db.query(sql, [req.params.status, req.params.id], (err, result) => {
        if (err) return errorResponse(500, "Internal server error", res);

        if (result.affectedRows == 0) {
          return errorResponse(403, "Tidak bisa mengaktifkan user", res);
        }

        next();
      });
    }

    if (data.role == "Superadmin") {
      const sql = `UPDATE users SET status_user = ? WHERE ? && id_role != 'SU'`;
      db.query(sql, [req.params.status, req.params.id], (err, result) => {
        if (err) return errorResponse(500, "Internal server error", res);

        if (result.affectedRows == 0) {
          return errorResponse(403, "Tidak bisa mengaktifkan user", res);
        }
        next();
      });
    }
  }
};

module.exports = updateStatus;
