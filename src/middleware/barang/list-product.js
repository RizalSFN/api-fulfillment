const errorResponse = require("../../response/error-response.js");
const db = require("../../application/config.js");

const listProduct = (req, res, next) => {
  const data = req.tokenDecode;

  if (!data) return errorResponse(403, "Invalid token", res);

  const sql = `SELECT barang.id, barang.sku as 'SKU', barang.deskripsi as 'Deskripsi', barang.foto as 'Foto', brand.nama_brand as 'Brand', varian.jenis_barang as "Kategori Product" FROM varian INNER JOIN barang ON varian.id_barang = barang.id INNER JOIN brand ON barang.id_brand = brand.id`;

  // const sql = `SELECT barang.id as "Id Barang", barang.sku as "SKU", barang.deskripsi as "Deskripsi", barang.foto as "Foto", brand.nama_brand as "Brand", varian.jenis_barang as "Kategori Product", varian.ukuran as "Ukuran", varian.stok as "Stok", varian.harga as "Harga" FROM varian INNER JOIN barang ON varian.id_barang = barang.id INNER JOIN brand ON barang.id_brand = brand.id`;

  db.query(sql, (err, result) => {
    if (err) return errorResponse(500, "Internal server error", res);

    if (!result) return errorResponse(404, "Not found", res);

    if (result[0] == undefined || result[0] == []) {
      return errorResponse(404, "Not found", res);
    }

    req.productData = result;
    next();
  });
};

module.exports = listProduct;
