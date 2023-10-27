const errorResponse = require("../../response/error-response.js");
const db = require("../../application/config.js");

const listProduct = (req, res, next) => {
  const data = req.tokenDecode;

  if (!data) return errorResponse(401, "Invalid token", "Unauthorized", res);

  const sql = `SELECT barang.id, barang.nama_barang as "Nama barang", barang.sku as "SKU", barang.deskripsi as "Deskripsi", barang.foto as "Foto", brand.nama_brand as "Brand" FROM barang INNER JOIN brand ON barang.id_brand = brand.id`;

  db.query(sql, (err, result) => {
    if (err) return errorResponse(500, err.message, "Internal server error", res);

    if (!result) return errorResponse(404, "Data tidak ditemukan", "Not found", res);

    if (result[0] == undefined || result[0] == []) {
      return errorResponse(404, "Data tidak ditemukan", "Not found", res);
    }

    req.productData = result; 
    next();
  });
};

module.exports = listProduct;
