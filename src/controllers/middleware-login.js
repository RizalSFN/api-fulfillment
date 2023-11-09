const db = require("../connection/config.js");
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const errorResponse = require("../response/error-response.js");
require("dotenv").config();
const secret_key = process.env.SECRET_KEY;

app.use(express.json());

const loginMiddleware = (req, res, next) => {
  const sql = `SELECT users.id, users.nama, users.password, role_users.role, users.status_user FROM users INNER JOIN role_users ON users.id_role = role_users.id WHERE username = ?`;
  db.query(sql, [req.body.username], (err, result) => {
    if (err) return errorResponse(500, err.message, res);
    const user = result[0];

    if (user === undefined) {
      return errorResponse(400, "Invalid username or password", res);
    }

    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        return errorResponse(500, err.message, res);
      }

      if (!result || result === undefined) {
        return errorResponse(400, "Invalid username or password", res);
      }

      if (user.status_user !== "aktif") {
        return errorResponse(400, "The account isn't active", res);
      }

      const data = {
        id_user: user.id,
        nama: user.nama,
        role: user.role,
        status: user.status,
      };

      const token = jwt.sign(data, secret_key, {
        expiresIn: "1d",
      });

      const time = Date.now() / 1000 + 86400;

      db.query(
        `SELECT * FROM token_akses WHERE id_user = ?`,
        [user.id],
        (err, result) => {
          if (err) return errorResponse(500, err.message, res);

          const tokenAkses = result[0];
          const nowTime = Date.now() / 1000;

          if (tokenAkses !== undefined) {
            const expire = tokenAkses.expire_token;
            if (expire < nowTime) {
              db.query(
                `DELETE FROM token_akses WHERE id_user = ?`,
                [user.id],
                (err, result) => {
                  if (err) {
                    return errorResponse(500, err.message, res);
                  }

                  const queri = `INSERT INTO token_akses VALUES ('${user.id}', '${token}', '${time}')`;
                  db.query(queri, (err, result) => {
                    if (err) {
                      return errorResponse(500, err.message, res);
                    }

                    db.query(
                      `INSERT INTO history_users (id_user_aksi, keterangan_aksi) VALUES ('${user.id}', 'Melakukan login ulang setelah token expire')`,
                      (err, result) => {
                        if (err) return errorResponse(500, err.message, res);

                        req.user = user;
                        req.token = token;
                        return next();
                      }
                    );
                  });
                }
              );
            } else {
              return errorResponse(403, "Logout terlebih dahulu", res);
            }
          } else {
            const queri = `INSERT INTO token_akses VALUES ('${user.id}', '${token}', '${time}')`;
            db.query(queri, (err, result) => {
              if (err) return errorResponse(500, err.message, res);

              db.query(
                `INSERT INTO history_users (id_user_aksi, keterangan_aksi) VALUES ('${user.id}', 'Melakukan login')`,
                (err, result) => {
                  if (err) return errorResponse(500, err.message, res);

                  req.user = user;
                  req.token = token;
                  return next();
                }
              );
            });
          }

          if (tokenAkses && tokenAkses.expire_token > nowTime) {
            return errorResponse(403, "Logout terlebih dahulu", res);
          }
        }
      );
    });
  });
};

module.exports = loginMiddleware;
