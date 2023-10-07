const express = require("express");
const app = express();
const db = require("../../application/config.js");
const errorResponse = require("../../response/error-response.js");

app.use(express.json());

const search = (req, res, next) => {
  const data = req.tokenDecode;
  const keyword = req.query.keyword;

  if (!data) return errorResponse(401, "Invalid token", res);

  if (data.role == "Karyawan") {
    const sql = `SELECT barang.id, barang.nama_barang as "Nama barang", barang.sku as "SKU", barang.deskripsi as "Deskripsi", barang.foto as "Foto", brand.nama_brand as "Brand" FROM barang INNER JOIN brand ON barang.id_brand = brand.id WHERE barang.id LIKE '%${keyword}%' OR barang.nama_barang LIKE '%${keyword}%' OR barang.sku LIKE '%${keyword}%'`;

    db.query(sql, (err, result) => {
      if (err) return errorResponse(500, "Internal server error", res);

      if (result[0] === undefined || result[0].length === 0) {
        return errorResponse(404, "Data tidak ditemukan", res);
      }

      req.dataSearch = result;
      next();
    });
  }

  if (data.role == "Supervisor") {
    const sql = `SELECT users.id, users.nama, role_users.role, users.status_user FROM users INNER JOIN role_users ON users.id_role = role_users.id WHERE users.id_role != 'SU'`;
  }

  if (data.role == "Superadmin") {
    // do something
  }
};

module.exports = search;
