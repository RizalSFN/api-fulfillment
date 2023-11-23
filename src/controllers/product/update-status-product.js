const errorResponse = require("../../response/error-response.js");
const db = require("../../connection/config.js");

const statusProduct = (req, res, next) => {
  const data = req.tokenDecode;
  const varStatus = req.params.stat;
  const idVarian = req.query.id;
  const newStatus = varStatus.toLowerCase();

  if (!data) return errorResponse(401, "Invalid token", res);

  if (!newStatus || newStatus === undefined) {
    return errorResponse(400, "Invalid request status", res);
  } else if (!idVarian || idVarian === undefined) {
    return errorResponse(400, "Invalid params id", res);
  }

  if (newStatus === "unready" || newStatus === "ready") {
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
            `INSERT INTO history_barang (id_barang, id_user_aksi, keterangan_aksi) VALUES ('${varianResult.id_barang}', '${data.id_user}', 'Mengupdate status varian(${idVarian}) menjadi ${newStatus}')`,
            (err, result) => {
              if (err) return errorResponse(500, err.message, res);
              next();
            }
          );
        });
      }
    );
  } else {
    return errorResponse(400, "Invalid request status", res);
  }
};

module.exports = statusProduct;
