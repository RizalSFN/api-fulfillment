const errorResponse = require("../../response/error-response.js");
const db = require("../../application/config.js");
const express = require("express");
const app = express();

app.use(express.json());

const createVarian = (req, res, next) => {
  const data = req.tokenDecode;

  if (!data) return errorResponse(401, "Invalid token", "Unauthorized", res);

  const { id_barang, stok, harga, ukuran } = req.body;

  if (id_barang === undefined) {
    return errorResponse(400, "id barang is required", "Bad request", res);
  }

  if (stok == []) {
    return errorResponse(400, "Stok is required", "Bad request", res);
  }

  if (harga == []) {
    return errorResponse(400, "Harga is required", "Bad request", res);
  }

  if (ukuran == []) {
    return errorResponse(400, "Ukuran is required", "Bad request", res);
  }

  const sql = `INSERT INTO varian (id_barang, stok, harga, ukuran) VALUES ('${id_barang}', '${stok}', '${harga}', '${ukuran}')`;
  db.query(sql, (err, result) => {
    if (err)
      return errorResponse(500, err.message, "Internal server error", res);

    next();
  });
};

module.exports = createVarian;
