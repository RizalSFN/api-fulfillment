const errorResponse = require("../../response/error-response.js");
const db = require("../../connection/config.js");

const detailProduct = (req, res, next) => {
  const data = req.tokenDecode;

  if (!data) return errorResponse(401, "Invalid token", "Unauthorized", res);

  const sql = `SELECT barang.id, barang.sku as "SKU", barang.deskripsi as "Deskripsi", brand.nama_brand as "Brand", barang.varians FROM varian INNER JOIN barang ON varian.id_barang = barang.id INNER JOIN brand ON barang.id_brand = brand.id WHERE barang.id = ?`;

  db.query(sql, [req.params.id], (err, result) => {
    if (err)
      return errorResponse(500, err.message, "Internal server error", res);

    if (result[0] === undefined) {
      return errorResponse(404, "Data tidak ditemukan", "Not found", res);
    }

    const detailProduct = result[0];

    const sql1 = `SELECT ukuran, stok, harga, status_varian as "Status" FROM varian WHERE id_barang = ?`;
    db.query(sql1, [detailProduct.id], (err, result) => {
      if (err)
        return errorResponse(500, err.message, "Internal server error", res);

      if (result[0] === undefined) {
        return errorResponse(
          404,
          "Data varian tidak ditemukan",
          "Not found",
          res
        );
      }

      detailProduct.varians = result;
      req.detail = detailProduct;
      next();
    });
  });
};

module.exports = detailProduct;

// TO DO ( SOLVED )
// Menampilkan response menjadi seperti ini :
// [
//   {
//     "Id Barang": 5,
//     "SKU": "Nisa set",
//     "Deskripsi": "bahan cotton combed nyaman dipakai",
//     "Foto": "bajuSetelan.jpg",
//     "Brand": "Hoofla",
//     "Varian": [
//       {
//          "Kategori Product": "Pakaian",
//          "Ukuran": "XL",
//          "Stok": 100,
//          "Harga": "115000"
//       },
//       {
//        "Kategori Product": "Pakaian",
//        "Ukuran": "L",
//        "Stok": 90,
//        "Harga": "110000"
//     }
//     ]
//   },
// ];
