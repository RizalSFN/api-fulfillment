const errorResponse = require("../../response/error-response.js");
const db = require("../../application/config.js");
const { default: isEmail } = require("validator/lib/isEmail.js");
const express = require("express");
const app = express();

app.use(express.json());

const updateUser = (req, res, next) => {
  const data = req.tokenDecode;
  const idUser = req.params.id;

  if (!data) return errorResponse(401, "Invalid token", "Unauthorized", res);

  if (data.role == "Karyawan")
    return errorResponse(403, "Access denied", "Forbidden", res);

  if (req.body.email !== undefined) {
    if (!isEmail(req.body.email)) {
      return errorResponse(400, "Invalid email", "Bad request", res);
    }
  }

  const myDate = new Date();
  const waktu = myDate.toLocaleTimeString();
  const tanggal = myDate.getDate();
  const bulan = myDate.getMonth();
  const tahun = myDate.getFullYear();
  const dateFormat = `${tahun}-${bulan + 1}-${tanggal} ${waktu}`;

  db.query(
    `SELECT username FROM users WHERE username = '${req.body.username}' AND id != '${idUser}'`,
    (err, result) => {
      if (err)
        return errorResponse(500, err.message, "Internal server error", res);

      if (result[0] != undefined) {
        return errorResponse(400, "Username already exist", "Bad request", res);
      }

      db.query(
        `SELECT email FROM users WHERE email = '${req.body.username}' AND id != '${idUser}'`,
        (err, result) => {
          if (err)
            return errorResponse(
              500,
              err.message,
              "Internal server error",
              res
            );

          if (result[0] != undefined) {
            return errorResponse(
              400,
              "Email already exist",
              "Bad request",
              res
            );
          }

          const str = req.body.id_role.toUpperCase();
          if (str === "KARYAWAN" || str === "KRY") {
            req.body.id_role = "KRY";
          } else if (str === "SUPERVISOR" || str === "SPV") {
            req.body.id_role = "SPV";
          } else {
            return errorResponse(
              400,
              "Role not available",
              "Bad request",
              res
            );
          }

          if (data.role == "Supervisor") {
            if (req.body.id_role) {
              return errorResponse(
                400,
                "Cannot update role",
                "Bad request",
                res
              );
            }
            const sql = `UPDATE users SET ?, updated_at = '${dateFormat}' WHERE id = ? AND id_role = 'KRY'`;
            db.query(sql, [req.body, idUser], (err, result) => {
              if (err)
                return errorResponse(
                  500,
                  err.message,
                  "Internal server error",
                  res
                );
              if (result.affectedRows == 0) {
                return errorResponse(
                  400,
                  "Cannot update user",
                  "Bad request",
                  res
                );
              }
              next();
            });
          }

          if (data.role == "Superadmin") {
            const sql = `UPDATE users SET updated_at = ?, ? WHERE id = ? AND id_role != 'SU'`;
            db.query(sql, [dateFormat, req.body, idUser], (err, result) => {
              if (err)
                return errorResponse(
                  500,
                  err.message,
                  "Internal server error",
                  res
                );
              if (result.affectedRows == 0) {
                return errorResponse(
                  400,
                  "Cannot update user",
                  "Bad request",
                  res
                );
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
