const errorResponse = require("../../response/error-response.js");
const db = require("../../application/config.js");
const express = require("express");
const app = express();

app.use(express.json());

const createProduct = (req, res, next) => {
  const data = req.tokenDecode;

  if (!data) return errorResponse(401, "Invalid token", "Unauthorized", res);

  const { nama_barang, sku, deskripsi, foto, brand } = req.body;

  db.query(`SELECT sku FROM barang WHERE sku = '${sku}'`, (err, result) => {
    if (err) return errorResponse(500, err.message, "Internal server error", res);

    if (result[0] !== undefined) {
      return errorResponse(400, "Product already exist", "Bad request", res);
    }

    if (nama_barang === undefined) {
      return errorResponse(400, "Nama barang is required", "Bad request", res);
    }

    if (sku === undefined) {
      return errorResponse(400, "SKU is required", "Bad request", res);
    }

    if (deskripsi === undefined) {
      return errorResponse(400, "Deskripsi is required", "Bad request", res);
    }

    if (foto === undefined) {
      return errorResponse(400, "Foto is required", "Bad request", res);
    }

    if (brand === undefined) {
      return errorResponse(400, "Brand is required", "Bad request", res);
    }
    const brandName = brand.toUpperCase();

    const sql = `INSERT INTO barang (nama_barang, sku, deskripsi, foto, id_brand, id_user) VALUES ('${nama_barang}', '${sku}', '${deskripsi}', '${foto}', '${brandName}','${data.id_user}')`;
    db.query(sql, (err, result) => {
      if (err) return errorResponse(500, err.message, "Internal server error", res);

      next();
    });
  });
};

module.exports = createProduct;
