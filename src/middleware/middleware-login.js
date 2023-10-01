const db = require("../application/config.js");
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
    if (err) return errorResponse(404, err.message, res);
    const user = result[0];

    if (user == undefined) {
      return errorResponse(400, "Invalid username or password", res);
    }

    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        return errorResponse(500, "Internal server error", res);
      }

      if (!result) {
        return errorResponse(400, "Invalid username or password", res);
      }

      if (user.status_user != "aktif") {
        return errorResponse(400, "Status akun sudah nonaktif", res);
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

      const time = Date.now() / 1000 + 3600;

      db.query(
        `SELECT * FROM token_akses WHERE id_user = ?`,
        [user.id],
        (err, result) => {
          if (err) return errorResponse(403, "Invalid token", res);

          const tokenAkses = result[0];

          if (tokenAkses == undefined) {
            const queri = `INSERT INTO token_akses VALUES ('${user.id}', '${token}', '${time}')`;
            db.query(queri, (err, result) => {
              if (err) return errorResponse(500, "Internal server error", res);
              req.user = user;
              req.token = token;
              next();
            });
          }

          if (tokenAkses != undefined) {
            const expire = tokenAkses.expire_token;
            if (expire < Date.now() / 1000) {
              db.query(
                `DELETE FROM token_akses WHERE id_user = ?`,
                [user.id],
                (err, result) => {
                  if (err) {
                    return errorResponse(500, "Internal server error", res);
                  }

                  const queri = `INSERT INTO token_akses VALUES ('${user.id}', '${token}', '${time}')`;
                  db.query(queri, (err, result) => {
                    if (err)
                      return errorResponse(500, "Internal server error", res);
                    req.user = user;
                    req.token = token;
                    next();
                  });
                }
              );
            }

            return errorResponse(400, "Logout terlebih dahulu", res);
          }
        }
      );
    });
  });
};

module.exports = loginMiddleware;
