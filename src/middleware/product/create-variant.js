const errorResponse = require("../../response/error-response.js");
const db = require("../../application/config.js");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const createVarian = (req, res, next) => {
  const data = req.tokenDecode;

  if (!data) return errorResponse(403, "Invalid token", res);

  const { id_barang, stok, harga, ukuran } = req.body;

  const sql = `INSERT INTO varian (id_barang, stok, harga, ukuran) VALUES ('${id_barang}', '${stok}', '${harga}', '${ukuran}')`;
  db.query(sql, (err, result) => {
    if (err) return errorResponse(500, "Internal server error", res);

    next();
  });
};

module.exports = createVarian;
