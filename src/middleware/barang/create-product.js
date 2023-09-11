const errorResponse = require("../../response/error-response.js");
const db = require("../../application/config.js");

const createProduct = (req, res, next) => {
  const data = req.tokenDecode;
  const {
    nama_barang,
    sku,
    deskripsi,
    foto,
    id_brand,
    stok,
    berat,
    id_varian,
    harga,
  } = req.body;

  if (!data) return errorResponse(403, "Invalid token", res);
};
