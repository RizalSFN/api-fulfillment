const errorResponse = require("../../response/error-response.js");
const db = require("../../application/config.js");

const listUser = (req, res, next) => {
  const data = req.tokenDecode;

  if (!data) {
    return errorResponse(401, "Invalid token", "Unauthorized", res);
  }

  if (data.role == "Karyawan") {
    return errorResponse(403, "Akses ditolak", "Forbidden", res);
  }

  if (data.role == "Superadmin") {
    const sql = `SELECT users.id, users.nama, role_users.role, users.status_user FROM users INNER JOIN role_users ON users.id_role = role_users.id`;
    db.query(sql, (err, result) => {
      if (err) return errorResponse(500, err.message, "Internal server error", res);

      req.userData = result;
      next();
    });
  }

  const sql = `SELECT users.id, users.nama, role_users.role, users.status_user FROM users INNER JOIN role_users ON users.id_role = role_users.id WHERE users.id_role != 'SU';`;
  db.query(sql, (err, result) => {
    if (err) return errorResponse(500, err.message, "Internal server error", res);

    req.userData = result;
    next();
  });
};

module.exports = listUser;
