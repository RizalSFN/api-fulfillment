const errorResponse = require("../../response/error-response.js");
const db = require("../../application/config.js");
const express = require("express");
const app = express();

app.use(express.json());

const createVarian = (req, res, next) => {
  const data = req.tokenDecode;

  if (!data) return errorResponse(401, "Invalid token", res);

  const { id_barang, stok, harga, ukuran } = req.body;

  if (!id_barang || id_barang === undefined) {
    return errorResponse(400, "id barang is required", res);
  } else {
    db.query(
      `SELECT id FROM barang WHERE id = '${id_barang}'`,
      (err, result) => {
        if (err) return errorResponse(500, err.message, res);

        if (result[0] === undefined) {
          return errorResponse(400, "Invalid id barang", res);
        } else if (!stok || stok === undefined) {
          return errorResponse(400, "Stok is required", res);
        } else if (!harga || harga === undefined) {
          return errorResponse(400, "Harga is required", res);
        } else if (!ukuran || ukuran === undefined) {
          return errorResponse(400, "Ukuran is required", res);
        } else {
          const sql = `INSERT INTO varian (id_barang, stok, harga, ukuran) VALUES ('${id_barang}', '${stok}', '${harga}', '${ukuran}')`;
          db.query(sql, (err, result) => {
            if (err) return errorResponse(500, err.message, res);

            next();
          });
        }
      }
    );
  }
};

module.exports = createVarian;
