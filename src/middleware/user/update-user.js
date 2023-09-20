const errorResponse = require("../../response/error-response.js");
const db = require("../../application/config.js");
const { default: isEmail } = require("validator/lib/isEmail.js");
const express = require("express");
const app = express();

app.use(express.json());

const updateUser = (req, res, next) => {
  const data = req.tokenDecode;
  const idUser = req.params.id;

  const { nama, username, email, role } = req.body;

  if (!data) return errorResponse(403, "Invalid token", res);

  if (data.role == "Karyawan") return errorResponse(403, "Akses ditolak", res);

  if (!isEmail(email)) {
    return errorResponse(400, "Invalid email", res);
  }

  db.query(
    `SELECT username FROM users WHERE username = '${username}' AND id != '${idUser}'`,
    (err, result) => {
      if (err) return errorResponse(500, "Internal server error", res);

      if (result[0] != undefined) {
        return errorResponse(400, "Username already exist", res);
      }

      db.query(
        `SELECT email FROM users WHERE email = '${username}' AND id != '${idUser}'`,
        (err, result) => {
          if (err) return errorResponse(500, "Internal server error", res);

          if (result[0] != undefined) {
            return errorResponse(400, "Email already exist", res);
          }

          if (data.role == "Supervisor") {
            const sql = `UPDATE users SET nama = '${nama}', username = '${username}', email = '${email}', role = '${role}' WHERE id = ? && id_role = 'KRY'`;
            db.query(sql, [idUser], (err, result) => {
              if (err) return errorResponse(500, err.message, res);
              if (result.affectedRows == 0) {
                return errorResponse(400, "Cannot update user", res);
              }
              next();
            });
          }

          if (data.role == "Superadmin") {
            const sql = `UPDATE users SET nama = '${nama}', username = '${username}', email = '${email}', role = '${role}' WHERE id = ? && id_role != 'SU'`;
            db.query(sql, [idUser], (err, result) => {
              if (err) return errorResponse(500, err.message, res);
              if (result.affectedRows == 0) {
                return errorResponse(400, "Cannot update user", res);
              }
              next();
            });
          }
        }
      );
    }
  );
};

module.exports = updateUser;
