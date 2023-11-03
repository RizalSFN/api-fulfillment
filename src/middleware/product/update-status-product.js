const errorResponse = require("../../response/error-response.js");
const db = require("../../application/config.js");

const statusProduct = (req, res, next) => {
  const data = req.tokenDecode;
  const newStatus = req.query.stat.toLowerCase();
  const idVarian = req.query.id;
  // console.log(newStatus)
  // TO DO BIG UPDATE => MENGUBAH METODE UPDATE STATUS DARI YANG ASALNYA MENGGUNAKAN PARAMETER URL, JADI MENGGUNAKAN PARAMETER QUERY

  if (!data) return errorResponse(401, "Invalid token", res);

  if (!newStatus || newStatus === undefined) {
    return errorResponse(400, "Invalid params status", res);
  } else if (!idVarian || idVarian === undefined) {
    return errorResponse(400, "Invalid params id", res);
  }

  // const lowerNewStatus = newStatus.toLowerCase();

  if (lowerNewStatus !== "unready" || lowerNewStatus !== "ready") {
    return errorResponse(400, "Invalid params status", res);
  }

  db.query(
    `SELECT id, id_barang, ukuran FROM varian WHERE id = '${idVarian}'`,
    (err, result) => {
      if (err) return errorResponse(500, err.message, res);

      const varianResult = result[0];

      if (
        varianResult.id === undefined ||
        varianResult.id_barang === undefined
      ) {
        return errorResponse(400, "Invalid params id", res);
      }

      const sql = `UPDATE varian SET status_varian = ? WHERE id = ?`;
      db.query(sql, [newStatus, idVarian], (err, result) => {
        if (err) return errorResponse(500, err.message, res);

        if (result.affectedRows === 0) {
          return errorResponse(400, "Invalid data", res);
        }

        db.query(
          `INSERT INTO log_barang (id_barang, id_user_aksi, keterangan_aksi) VALUES ('${varianResult.id_barang}', '${data.id_user}', 'Mengupdate status varian barang(${idVarian}) menjadi ${newStatus}')`,
          (err, result) => {
            if (err) return errorResponse(500, err.message, res);
            next();
          }
        );
      });
    }
  );
};

module.exports = statusProduct;
