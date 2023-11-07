const errorResponse = require("../../response/error-response.js");
const db = require("../../application/config.js");
const express = require("express");
const app = express();

app.use(express.json());

function toFirstCapitalize(str) {
  return str.toLowerCase().replace(/\b\w/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1);
  });
}

const createBrand = (req, res, next) => {
  const data = req.tokenDecode;
  const idBrand = req.body.id.toUpperCase();
  const namaBrand = toFirstCapitalize(req.body.nama);

  if (!data) return errorResponse(401, "Invalid token", res);

  db.query(
    `INSERT INTO brand (id, nama_brand) VALUES ('${idBrand}', '${namaBrand}')`,
    (err, result) => {
      if (err) return errorResponse(500, err.message, res);

      db.query(
        `INSERT INTO history_barang (id_user_aksi, keterangan_aksi) VALUES ('${data.id_user}', 'Menambah brand baru')`,
        (err, result) => {
          if (err) return errorResponse(500, err.message, res);
          next();
        }
      );
    }
  );
};

module.exports = createBrand;
