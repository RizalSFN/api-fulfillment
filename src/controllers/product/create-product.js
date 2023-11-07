const errorResponse = require("../../response/error-response.js");
const db = require("../../application/config.js");
const express = require("express");
const app = express();

app.use(express.json());

const createProduct = (req, res, next) => {
  const data = req.tokenDecode;

  if (!data) return errorResponse(401, "Invalid token", res);

  const { nama_barang, sku, deskripsi, brand } = req.body;

  db.query(`SELECT sku FROM barang WHERE sku = '${sku}'`, (err, result) => {
    if (err) return errorResponse(500, err.message, res);

    if (result[0] !== undefined) {
      return errorResponse(400, "Product already exist", res);
    }

    if (!nama_barang || nama_barang === undefined) {
      return errorResponse(400, "Nama barang is required", res);
    } else if (!sku || sku === undefined) {
      return errorResponse(400, "SKU is required", res);
    } else if (!deskripsi || deskripsi === undefined) {
      return errorResponse(400, "Deskripsi is required", res);
    } else if (!foto || foto === undefined) {
      return errorResponse(400, "Foto is required", res);
    } else if (!brand || brand === undefined) {
      return errorResponse(400, "Brand is required", res);
    }

    const brandName = brand.toUpperCase();
    db.query(
      `SELECT id FROM brand WHERE id = '${brandName}' OR nama_brand = '${brandName}'`,
      (err, result) => {
        if (err) return errorResponse(500, err.message, res);

        if (result[0] !== undefined) {
          const sql = `INSERT INTO barang (nama_barang, sku, deskripsi, id_brand, id_user) VALUES ('${nama_barang}', '${sku}', '${deskripsi}', '${result[0].id}','${data.id_user}')`;
          db.query(sql, (err, result) => {
            if (err) return errorResponse(500, err.message, res);

            db.query(
              `INSERT INTO history_barang (id_barang, id_user_aksi, keterangan_aksi) VALUES ('${result.insertId}', '${data.id_user}', 'Menambah barang baru')`,
              (err, result) => {
                if (err) return errorResponse(500, err.message, res);
                next();
              }
            );
          });
        } else {
          return errorResponse(400, "Invalid brand name", res);
        }
      }
    );
  });
};

module.exports = createProduct;
