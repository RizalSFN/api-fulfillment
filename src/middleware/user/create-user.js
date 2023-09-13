const db = require("../../application/config.js");
const express = require("express");
const errorResponse = require("../../response/error-response.js");
const app = express();
const bcrypt = require("bcrypt");
const { default: isEmail } = require("validator/lib/isEmail.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const createUser = (req, res, next) => {
  const data = req.tokenDecode;

  if (!data) {
    return errorResponse(401, "Invalid token", res);
  }

  if (data.role == "Karyawan") {
    return errorResponse(401, "Akses ditolak", res);
  }

  if (data.role == "Supervisor") {
    const { nama, username, password, email } = req.body;

    if (nama == [] || !nama) {
      return errorResponse(400, "Nama is required", res);
    }

    if (email == [] || !email) {
      return errorResponse(400, "Email is required", res);
    }

    if (username.length < 12) {
      return errorResponse(
        400,
        "username harus berjumlah 12 karakter atau lebih",
        res
      );
    }

    if (!/\d/.test(password)) {
      return errorResponse(
        400,
        "Password harus terdiri dari huruf dan angka",
        res
      );
    }

    if (password.length < 12) {
      return errorResponse(
        400,
        "Password harus berjumlah 12 karakter atau lebih",
        res
      );
    }

    if (!isEmail(email)) {
      return errorResponse(400, "Invalid email", res);
    }

    bcrypt.hash(password, 12, (err, hash) => {
      if (err) return errorResponse(500, err.message, res);

      const sql = `INSERT INTO users (nama, username, password, email, id_role, status_user, id_user_create) VALUES ('${nama}', '${username}', '${hash}', '${email}', 'KRY', 'aktif', '${data.id_user}')`;
      db.query(sql, (err, result) => {
        if (err) return errorResponse(500, err.message, res);
        next();
      });
    });
  }

  if (data.role == "Superadmin") {
    const { nama, username, password, email, role } = req.body;

    if (nama == [] || !nama) {
      return errorResponse(400, "Nama is required", res);
    }

    if (role == [] || !role) {
      return errorResponse(400, "Role is required", res);
    }

    if (email == [] || !email) {
      return errorResponse(400, "Email is required", res);
    }

    const str = role.toUpperCase();

    if (str == "SU") {
      return errorResponse(400, "Akun superadmin sudah ada", res);
    }

    if (username.length < 12) {
      return errorResponse(
        400,
        "Username harus berjumlah minimal 12 karakter",
        res
      );
    }

    if (!/\d/.test(password)) {
      return errorResponse(
        400,
        "Password harus terdiri dari huruf dan angka",
        res
      );
    }

    if (password.length < 12) {
      return errorResponse(
        400,
        "Password harus berjumlah minimal 12 karakter",
        res
      );
    }

    if (!isEmail(email)) {
      return errorResponse(400, "Invalid email", res);
    }

    bcrypt.hash(password, 12, (err, hash) => {
      if (err) return errorResponse(500, err.message, res);

      const sql = `INSERT INTO users (nama, username, password, email, id_role, status_user, id_user_create) VALUES ('${nama}', '${username}', '${hash}', '${email}', '${role}', 'aktif', '${data.id_user}')`;
      db.query(sql, (err, result) => {
        if (err) return errorResponse(500, err.message, res);
        next();
      });
    });
  }
};

module.exports = createUser;
