const errorResponse = require("../../response/error-response.js");
const db = require("../../connection/config.js");

const listProduct = (req, res, next) => {
  const data = req.tokenDecode;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;

  if (!data) return errorResponse(401, "Invalid token", res);

  const sql = `SELECT barang.id, barang.nama_barang as "Nama barang", barang.sku as "SKU", barang.deskripsi as "Deskripsi", brand.nama_brand as "Brand" FROM barang INNER JOIN brand ON barang.id_brand = brand.id LIMIT ${startIndex}, ${limit}`;

  db.query(`SELECT COUNT(*) as total FROM barang`, (err, result) => {
    if (err) return errorResponse(500, err.message, res);
    const total = result[0].total;
    const totalPages = Math.ceil(total / limit);

    db.query(sql, (err, result) => {
      if (err) return errorResponse(500, err.message, res);

      if (result[0] === undefined) {
        return errorResponse(404, "Data not found", res);
      } else if (page > totalPages) {
        return errorResponse(404, "Data not found", res);
      }
      const dataPage = {
        currentPage: page,
        totalPages: totalPages,
      };
      req.pagination = dataPage;
      req.productData = result;
      next();
    });
  });
};

module.exports = listProduct;
