const db = require("../../application/config.js");
const express = require("express");
const errorResponse = require("../../response/error-response.js");
const app = express();
const bcrypt = require("bcrypt");
const { default: isEmail } = require("validator/lib/isEmail.js");

app.use(express.json());

const createUser = (req, res, next) => {
  const data = req.tokenDecode;

  if (!data) {
    return errorResponse(401, "Invalid token", res);
  }

  if (data.role == "Karyawan") {
    return errorResponse(403, "Access denied", res);
  } else if (data.role == "Supervisor") {
    const { nama, username, password, email } = req.body;

    if (req.body.role) {
      return errorResponse(400, "Cannot add role", res);
    }
    db.query(
      `SELECT username FROM users WHERE username = '${username}'`,
      (err, result) => {
        if (err)
          return errorResponse(500, err.message, res);

        if (result[0] != undefined) {
          return errorResponse(
            400,
            "Username already exist",
            res
          );
        }

        db.query(
          `SELECT email FROM users WHERE email = '${email}'`,
          (err, result) => {
            if (err)
              return errorResponse(
                500,
                err.message,
                res
              );

            if (result[0] !== undefined) {
              return errorResponse(
                400,
                "Email already exist",
                res
              );
            }

            if (nama === undefined) {
              return errorResponse(400, "Nama is required", res);
            }

            if (email === undefined) {
              return errorResponse(
                400,
                "Email is required",
                res
              );
            }

            if (username.length < 12) {
              return errorResponse(
                400,
                "Username must be 12 character or more",
                res
              );
            }

            if (!/\d/.test(password)) {
              return errorResponse(
                400,
                "Password must contains alphanumeric",
                res
              );
            }

            if (password.length < 12) {
              return errorResponse(
                400,
                "Password must be 12 character or more ",
                res
              );
            }

            if (!isEmail(email)) {
              return errorResponse(400, "Invalid email", res);
            }

            bcrypt.hash(password, 12, (err, hash) => {
              if (err) return errorResponse(500, err.message, res);

              const sql = `INSERT INTO users (nama, username, password, email, id_role, status_user) VALUES ('${nama}', '${username}', '${hash}', '${email}', 'KRY', 'aktif')`;
              db.query(sql, (err, result) => {
                if (err)
                  return errorResponse(
                    500,
                    err.message,
                    res
                  );
                db.query(
                  `INSERT INTO log_users (id_user, id_user_aksi, keterangan_aksi) VALUES ('${result.insertId}', '${data.id_user}', 'Menambah user baru')`,
                  (err, result) => {
                    if (err)
                      return errorResponse(
                        500,
                        err.message,
                        res
                      );
                    next();
                  }
                );
              });
            });
          }
        );
      }
    );
  } else if (data.role == "Superadmin") {
    const { nama, username, password, email } = req.body;
    let role = req.body.role;

    db.query(
      `SELECT username FROM users WHERE username = '${username}'`,
      (err, result) => {
        if (err)
          return errorResponse(500, err.message, res);

        if (result[0] !== undefined) {
          return errorResponse(
            400,
            "Username already exist",
            res
          );
        }

        db.query(
          `SELECT email FROM users WHERE email = '${email}'`,
          (err, result) => {
            if (err) {
              return errorResponse(
                500,
                err.message,
                res
              );
            }

            if (result[0] !== undefined) {
              return errorResponse(
                400,
                "Email already exist",
                res
              );
            }

            if (nama === undefined) {
              return errorResponse(400, "Nama is required", res);
            }else if (role === undefined) {
              return errorResponse(400, "Role is required", res);
            }else if (email === undefined) {
              return errorResponse(
                400,
                "Email is required",
                res
              );
            }

            const str = role.toUpperCase();

            if (str == "SUPERADMIN" || str == "SU") {
              return errorResponse(
                400,
                "Cannot create Superadmin account",
                res
              );
            } else if (str == "SUPERVISOR" || str == "SPV") {
              role = "SPV";
            } else if (str == "KARYAWAN" || str == "KRY") {
              role = "KRY";
            } else {
              return errorResponse(
                400,
                "Role not available",
                res
              );
            }

            if (username.length < 12) {
              return errorResponse(
                400,
                "Username must have 12 character or more",
                res
              );
            }

            if (!/\d/.test(password)) {
              return errorResponse(
                400,
                "Password must contains alphanumeric",
                res
              );
            }

            if (password.length < 12) {
              return errorResponse(
                400,
                "Password must have 12 character or more",
                res
              );
            }

            if (!isEmail(email)) {
              return errorResponse(400, "Invalid email", res);
            }

            bcrypt.hash(password, 12, (err, hash) => {
              if (err)
                return errorResponse(
                  500,
                  err.message,
                  res
                );

              const sql = `INSERT INTO users (nama, username, password, email, id_role, status_user) VALUES ('${nama}', '${username}', '${hash}', '${email}', '${role}', 'aktif')`;
              db.query(sql, (err, result) => {
                if (err)
                  return errorResponse(
                    500,
                    err.message,
                    res
                  );
                db.query(
                  `INSERT INTO log_users (id_user, id_user_aksi, keterangan_aksi) VALUES ('${result.insertId}', '${data.id_user}', 'Menambah user baru')`,
                  (err, result) => {
                    if (err)
                      return errorResponse(
                        500,
                        err.message,
                        res
                      );
                    next();
                  }
                );
              });
            });
          }
        );
      }
    );
  }
};

module.exports = createUser;
