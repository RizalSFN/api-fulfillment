const errorResponse = require("../../response/error-response.js");
const db = require("../../application/config.js");
const { default: isEmail } = require("validator/lib/isEmail.js");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const updateUser = (req, res, next) => {
  const data = req.tokenDecode;
  const idUser = req.params.id;

  const updateData = req.body;

  if (!data) return errorResponse(403, "Invalid token", res);

  if (updateData.email != null || updateData.email != undefined) {
    if (!isEmail(updateData.email)) {
      return errorResponse(400, "Invalid email", res);
    }
  }

  if (data.role == "Karyawan") return errorResponse(403, "Akses ditolak", res);

  if (data.role == "Supervisor") {
    const sql = `UPDATE users SET ? WHERE id = ? && id_role = 'KRY'`;
    db.query(sql, [updateData, idUser], (err, result) => {
      if (err) return errorResponse(500, err.message, res);
      if (result.affectedRows == 0) {
        return errorResponse(403, "Cannot update user", res);
      }
      next();
    });
  }

  if (data.role == "Superadmin") {
    const sql = `UPDATE users SET ? WHERE id = ? && id_role != 'SU'`;
    db.query(sql, [updateData, idUser], (err, result) => {
      if (err) return errorResponse(500, err.message, res);
      if (result.affectedRows == 0) {
        return errorResponse(403, "Cannot update user", res);
      }
      next();
    });
  }
};

module.exports = updateUser;
