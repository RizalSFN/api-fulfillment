const errorResponse = require("../../response/error-response.js");
const db = require("../../connection/config.js");

const listUser = (req, res, next) => {
  const data = req.tokenDecode;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;

  if (!data) {
    return errorResponse(401, "Invalid token", res);
  }

  if (data.role === "Karyawan") {
    return errorResponse(403, "Access denied", res);
  } else if (data.role === "Superadmin") {
    db.query(`SELECT COUNT(*) as total FROM users`, (err, result) => {
      if (err) return errorResponse(500, err.message, res);
      const total = result[0].total;
      const totalPages = Math.ceil(total / limit);

      const sql = `SELECT users.id, users.nama, role_users.role, users.status_user FROM users INNER JOIN role_users ON users.id_role = role_users.id ORDER BY users.id ASC LIMIT ${startIndex}, ${limit}`;
      db.query(sql, (err, result) => {
        if (err) return errorResponse(500, err.message, res);
        if (page > totalPages)
            return errorResponse(404, "Data not found", res);
        const dataPage = {
          currentPage: page,
          totalPages: totalPages,
        };
        req.pagination = dataPage;
        req.userData = result;
        next();
      });
    });
  } else {
    db.query(
      `SELECT COUNT(*) as total FROM users WHERE id_role != 'SU'`,
      (err, result) => {
        if (err) return errorResponse(500, err.message, res);
        const total = result[0].total;
        const totalPages = Math.ceil(total / limit);

        const sql = `SELECT users.id, users.nama, role_users.role, users.status_user FROM users INNER JOIN role_users ON users.id_role = role_users.id WHERE users.id_role != 'SU' ORDER BY id ASC LIMIT ${startIndex}, ${limit}`;
        db.query(sql, (err, result) => {
          if (err) return errorResponse(500, err.message, res);
          if (page > totalPages)
            return errorResponse(404, "Data not found", res);
          const dataPage = {
            currentPage: page,
            totalPages: totalPages,
          };
          req.pagination = dataPage;
          req.userData = result;
          next();
        });
      }
    );
  }
};

module.exports = listUser;
