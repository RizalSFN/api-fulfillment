const errorResponse = require("../../response/error-response.js");
const db = require("../../application/config.js");

const listProduct = (req, res, next) => {
  const sql = `SELECT barang.id as 'Id barang', barang.sku as 'SKU', barang.deskripsi as 'Deskripsi', barang.foto as 'Foto', brand.nama_brand as 'Brand', barang.stok as 'Stok barang', barang.berat as 'Berat (gram)', varian.ukuran as 'Ukuran', varian.warna as 'Warna', barang.harga as 'Harga per item' FROM barang INNER JOIN brand ON barang.id_brand = brand.id INNER JOIN varian ON barang.id_varian = varian.id`;

  db.query(sql, (err, result) => {
    const data = req.tokenDecode;

    if (!data) return errorResponse(403, "Invalid data", res);

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
