const errorResponse = require("../../response/error-response.js");
const db = require("../../connection/config.js");
const express = require("express");
const app = express();

app.use(express.json());

const updateProduct = (req, res, next) => {
  const data = req.tokenDecode;

  if (!data) return errorResponse(401, "Invalid token", res);

  const idProduct = req.params.id;

  const myDate = new Date();
  const waktu = myDate.toLocaleTimeString();
  const tanggal = myDate.getDate();
  const bulan = myDate.getMonth();
  const tahun = myDate.getFullYear();
  const dateFormat = `${tahun}-${bulan + 1}-${tanggal} ${waktu}`;

  if (req.body.sku || req.body.sku !== undefined) {
    return errorResponse(400, "Cannot update sku", res);
  }

  if (req.body.id_user || req.body.id_user !== undefined) {
    return errorResponse(400, "Cannot update user creator", res);
  }

  const sql = `UPDATE barang SET ?, updated_at = ? WHERE id = ?`;
  db.query(sql, [req.body, dateFormat, idProduct], (err, result) => {
    if (err) return errorResponse(500, err.message, res);

    if (result.affectedRows === 0) {
      return errorResponse(400, "Invalid data", res);
    }

    const data_log = Object.keys(req.body);

    db.query(
      `INSERT INTO history_barang (id_barang, id_user_aksi, keterangan_aksi) VALUES ('${idProduct}', '${data.id_user}', 'Mengupdate barang bagian ${data_log}')`,
      (err, result) => {
        if (err) return errorResponse(500, err.message, res);
        next();
      }
    );
  });
};

module.exports = updateProduct;
