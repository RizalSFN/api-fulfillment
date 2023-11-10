const errorResponse = require("../../response/error-response.js");
const db = require("../../connection/config.js");

const updateVariant = (req, res, next) => {
  const data = req.tokenDecode;
  const idVarian = req.params.id;
  const data_log = Object.keys(req.body);

  if (!data) return errorResponse(401, "Invalid token", res);

  if (req.body.stok) return errorResponse(400, "Cannot update stok", res);

  db.query(
    `SELECT id_barang FROM varian WHERE id = ${idVarian}`,
    (err, result) => {
      if (err) return errorResponse(500, err.message, res);

      if (result[0] === undefined) {
        return errorResponse(400, "Invalid params id");
      }

      const idBarang = result[0].id_barang;

      if (req.body.harga) {
        if (!Number.isInteger(req.body.harga)) {
          return errorResponse(400, "Invalid price value", res);
        } else if (req.body.ukuran) {
          const newUkuran = req.body.ukuran.toUpperCase();
          db.query(
            `UPDATE varian SET harga = ?, ukuran = ? WHERE id = ?`,
            [req.body.harga, newUkuran, idVarian],
            (err, result) => {
              if (err) return errorResponse(500, err.message, res);

              db.query(
                `INSERT INTO history_barang (id_barang, id_user_aksi, keterangan_aksi) VALUES ('${idBarang}', '${data.id_user}', 'Mengupdate varian(${idVarian}) bagian ${data_log}')`,
                (err, result) => {
                  if (err) return errorResponse(500, err.message, res);
                  next();
                }
              );
            }
          );
        }
      } else if (req.body.ukuran) {
        const newUkuran = req.body.ukuran.toUpperCase();
        db.query(
          `UPDATE varian SET ukuran = ? WHERE id = ?`,
          [newUkuran, idVarian],
          (err, result) => {
            if (err) return errorResponse(500, err.message, res);

            db.query(
              `INSERT INTO history_barang (id_barang, id_user_aksi, keterangan_aksi) VALUES ('${idBarang}', '${data.id_user}', 'Mengupdate varian(${idVarian}) bagian ${data_log}')`,
              (err, result) => {
                if (err) return errorResponse(500, err.message, res);
                next();
              }
            );
          }
        );
      }
    }
  );
};

const updateStok = (req, res, next) => {
  const data = req.tokenDecode;
  const keterangan = req.params.keterangan;
  const idVarian = req.params.id;
  const stok = req.body.stok;
  const data_log = Object.keys(req.body);

  if (!data) return errorResponse(401, "Invalid token", res);

  if (stok || stok !== undefined) {
    if (Number.isInteger(stok)) {
      if (keterangan === "keluar") {
        db.query(
          `SELECT id_barang, stok, ukuran FROM varian WHERE id = '${idVarian}'`,
          (err, result) => {
            if (err) return errorResponse(500, err.message, res);

            const theResult = result[0];

            if (stok > theResult.stok) {
              return errorResponse(400, "Out of stock", res);
            } else {
              db.query(
                `UPDATE varian SET stok = stok - ${stok} WHERE id = '${idVarian}'`,
                (err, result) => {
                  if (err) return errorResponse(500, err.message, res);

                  db.query(
                    `INSERT INTO history_barang (id_barang, id_user_aksi, keterangan_aksi) VALUES ('${theResult.id_barang}', '${data.id_user}', 'Pengeluaran stok barang dengan varian ${theResult.ukuran} sebanyak ${stok}')`,
                    (err, result) => {
                      if (err) return errorResponse(500, err.message, res);
                      req.msg = "Pengeluaran";
                      next();
                    }
                  );
                }
              );
            }
          }
        );
      } else if (keterangan === "masuk") {
        db.query(
          `SELECT id_barang, stok, ukuran FROM varian WHERE id = '${idVarian}'`,
          (err, result) => {
            if (err) return errorResponse(500, err.message, res);

            const theResult = result[0];

            if (stok > theResult.stok) {
              return errorResponse(400, "Out of stock", res);
            } else {
              db.query(
                `UPDATE varian SET stok = stok + ${stok} WHERE id = '${idVarian}'`,
                (err, result) => {
                  if (err) return errorResponse(500, err.message, res);

                  db.query(
                    `INSERT INTO history_barang (id_barang, id_user_aksi, keterangan_aksi) VALUES ('${theResult.id_barang}', '${data.id_user}', 'Penambahan stok barang dengan varian ${theResult.ukuran} sebanyak ${stok}')`,
                    (err, result) => {
                      if (err) return errorResponse(500, err.message, res);
                      req.msg = "Penambahan";
                      next();
                    }
                  );
                }
              );
            }
          }
        );
      } else {
        return errorResponse(400, "Invalid params keterangan", res);
      }
    } else {
      return errorResponse(400, "Invalid data stok", res);
    }
  } else {
    return errorResponse(400, "Invalid data stok", res);
  }
};

module.exports = updateVariant;
module.exports = updateStok;
