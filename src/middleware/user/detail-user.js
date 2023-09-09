const errorResponse = require("../../response/error-response.js");
const db = require("../../application/config.js");

const detailUser = (req, res, next) => {
  const data = req.tokenDecode;
  const idUser = req.params.id;

  if (!data) {
    return errorResponse(401, "Invalid token", res);
  }

  const sql = `SELECT users.id, users.nama, users.email, role_users.role, users.status_user, users.created_at FROM users INNER JOIN role_users ON users.id_role = role_users.id WHERE users.id = ?`;
  db.query(sql, [idUser], (err, result) => {
    if (data.role == "Supervisor" && result[0].role == "Superadmin") {
      return errorResponse(404, "Not found", res);
    }

    if (err) return errorResponse(500, "Internal server error", res);

    if (!result) return errorResponse(404, "Not found", res);

    if (result[0] == undefined) return errorResponse(404, "Not found", res);

    req.userDetail = result;
    next();
  });
};

module.exports = detailUser;
