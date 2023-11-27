const errorResponse = require("../../response/error-response.js");
const db = require("../../connection/config.js");
const express = require("express");
const app = express();

app.use(express.json()); // UPDATE [SOLVED] => Menambahkan input warna dan pengecekan apakah varian dengan id_barang ... sudah ada

const createVarian = (req, res, next) => {
  const data = req.tokenDecode;

  if (!data) return errorResponse(401, "Invalid token", res);

  const { id_barang, stok, harga, ukuran, warna } = req.body;

  if (!id_barang || id_barang === undefined) {
    return errorResponse(400, "id barang is required", res);
  } else {
    db.query(
      `SELECT id FROM barang WHERE id = '${id_barang}'`,
      (err, result) => {
        if (err) return errorResponse(500, err.message, res);

        if (result[0] === undefined) {
          return errorResponse(400, "Invalid id barang", res);
        } else if (!stok || stok === undefined || !Number.isInteger(stok)) {
          return errorResponse(400, "Invalid stock", res);
        } else if (!harga || harga === undefined || !Number.isInteger(harga)) {
          return errorResponse(400, "Invalid price", res);
        } else if (!ukuran || ukuran === undefined) {
          return errorResponse(400, "Invalid size", res);
        } else if (!warna || warna === undefined) {
          return errorResponse(400, "Invalid colour", res);
        } else {
          const sql = `INSERT INTO varian (id_barang, stok, harga, ukuran, warna) VALUES ('${id_barang}', '${stok}', '${harga}', '${ukuran}', '${warna}')`;
          db.query(sql, (err, result) => {
            if (err) return errorResponse(500, err.message, res);

            db.query(
              `INSERT INTO history_barang (id_barang, id_user_aksi, keterangan_aksi) VALUES ('${id_barang}', '${data.id_user}', 'Menambah varian baru')`,
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
};

module.exports = createVarian;
