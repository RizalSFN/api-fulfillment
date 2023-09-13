const errorResponse = require("../../response/error-response.js");
const db = require("../../application/config.js");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const createProduct = (req, res, next) => {
  const data = req.tokenDecode;

  if (!data) return errorResponse(403, "Invalid token", res);

  const { nama_barang, sku, deskripsi, foto, brand } = req.body;
  const brandName = brand.toUpperCase();

  if (nama_barang == []) {
    return errorResponse(400, "Nama barang is required", res);
  }

  if (sku == []) {
    return errorResponse(400, "SKU is required", res);
  }

  if (deskripsi == []) {
    return errorResponse(400, "Deskripsi is required", res);
  }

  if (foto == []) {
    return errorResponse(400, "Foto is required", res);
  }

  if (brand == []) {
    return errorResponse(400, "Brand is required", res);
  }

  const sql = `INSERT INTO barang (nama_barang, sku, deskripsi, foto, id_brand, id_user) VALUES ('${nama_barang}', '${sku}', '${deskripsi}', '${foto}', '${brandName}','${data.id_user}')`;
  db.query(sql, (err, result) => {
    if (err) return errorResponse(500, err.message, res);

    next();
  });
};

module.exports = createProduct;
