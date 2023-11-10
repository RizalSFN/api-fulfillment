const errorResponse = require("../../response/error-response.js");
const db = require("../../connection/config.js");
const { default: isEmail } = require("validator/lib/isEmail.js");
const express = require("express");
const app = express();

app.use(express.json());

const updateUser = (req, res, next) => {
  const data = req.tokenDecode;
  const idUser = req.params.id;

  if (!data) return errorResponse(401, "Invalid token", res);

  if (data.role === "Karyawan") {
    return errorResponse(403, "Access denied", res);
  }

  const myDate = new Date();
  const waktu = myDate.toLocaleTimeString();
  const tanggal = myDate.getDate();
  const bulan = myDate.getMonth();
  const tahun = myDate.getFullYear();
  const dateFormat = `${tahun}-${bulan + 1}-${tanggal} ${waktu}`;

  if (req.body.email !== undefined) {
    if (!isEmail(req.body.email)) {
      return errorResponse(400, "Invalid email", res);
    }
  }

  if (req.body.password !== undefined) {
    return errorResponse(400, "Cannot update password", res);
  }

  db.query(
    `SELECT username FROM users WHERE username = '${req.body.username}' AND id != '${idUser}'`,
    (err, result) => {
      if (err) return errorResponse(500, err.message, res);

      if (result[0] !== undefined) {
        return errorResponse(400, "Username already exist", res);
      }

      db.query(
        `SELECT email FROM users WHERE email = '${req.body.username}' AND id != '${idUser}'`,
        (err, result) => {
          if (err) return errorResponse(500, err.message, res);

          if (result[0] !== undefined) {
            return errorResponse(400, "Email already exist", res);
          }

          if (req.body.id_role !== undefined) {
            const str = req.body.id_role.toUpperCase();
            if (str === "KARYAWAN" || str === "KRY") {
              req.body.id_role = "KRY";
            } else if (str === "SUPERVISOR" || str === "SPV") {
              req.body.id_role = "SPV";
            } else {
              return errorResponse(400, "Role not available", res);
            }
          }

          const data_log = Object.keys(req.body);

          if (data.role === "Supervisor") {
            if (req.body.id_role) {
              return errorResponse(400, "Cannot update role", res);
            }
            const sql = `UPDATE users SET ?, updated_at = ? WHERE id = ? AND id_role = 'KRY'`;
            db.query(sql, [req.body, dateFormat, idUser], (err, result) => {
              if (err) return errorResponse(500, err.message, res);
              if (result.affectedRows === 0) {
                return errorResponse(400, "Cannot update user", res);
              }

              db.query(
                `INSERT INTO history_users (id_user, id_user_aksi, keterangan_aksi) VALUES ('${idUser}', '${data.id_user}', 'Mengupdate user bagian ${data_log}')`,
                (err, result) => {
                  if (err) return errorResponse(500, err.message, res);
                  next();
                }
              );
            });
          }

          if (data.role === "Superadmin") {
            const sql = `UPDATE users SET ?, updated_at = ? WHERE id = ? AND id_role != 'SU'`;
            db.query(sql, [req.body, dateFormat, idUser], (err, result) => {
              if (err) return errorResponse(500, err.message, res);
              if (result.affectedRows === 0) {
                return errorResponse(400, "Cannot update user", res);
              }

              db.query(
                `INSERT INTO history_users (id_user, id_user_aksi, keterangan_aksi) VALUES ('${idUser}', '${data.id_user}', 'Mengupdate user bagian ${data_log}')`,
                (err, result) => {
                  if (err) return errorResponse(500, err.message, res);
                  next();
                }
              );
            });
          }
        }
      );
    }
  );
};

module.exports = updateUser;
