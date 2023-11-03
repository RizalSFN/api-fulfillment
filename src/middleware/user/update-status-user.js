const errorResponse = require("../../response/error-response.js");
const db = require("../../application/config.js");

const updateStatus = (req, res, next) => {
  const myDate = new Date();
  const waktu = myDate.toLocaleTimeString();
  const tanggal = myDate.getDate();
  const bulan = myDate.getMonth();
  const tahun = myDate.getFullYear();
  const dateFormat = `${tahun}-${bulan + 1}-${tanggal} ${waktu}`;

  if (req.query.stat === "nonaktif") {
    const data = req.tokenDecode;

    if (!data) return errorResponse(401, "Invalid token", res);

    if (!req.query.id || req.query.id === undefined){
      return errorResponse(400, "Invalid params", res)
    }

    if (data.role === "Karyawan") {
      return errorResponse(403, "Access denied", res);
    }

    if (data.role === "Supervisor") {
      const sql = `UPDATE users SET status_user = ?, updated_at = ? WHERE id = ? AND id_role = 'KRY'`;
      db.query(
        sql,
        [req.query.stat, dateFormat, req.query.id],
        (err, result) => {
          if (err) return errorResponse(500, err.message, res);

          if (result.affectedRows === 0) {
            return errorResponse(
              400,
              "Cannot deactivate user",
              res
            );
          }

          db.query(
            `INSERT INTO log_users (id_user, id_user_aksi, keterangan_aksi) VALUES ('${req.query.id}', '${data.id_user}', 'Menonaktifkan user')`,
            (err, result) => {
              if (err)
                return errorResponse(
                  500,
                  err.message,
                  res
                );
              next();
            }
          );
        }
      );
    } else if (data.role === "Superadmin") {
      const sql = `UPDATE users SET status_user = ?, updated_at = ? WHERE id = ? AND id_role != 'SU'`;
      db.query(
        sql,
        [req.query.stat, dateFormat, req.query.id],
        (err, result) => {
          if (err)
            return errorResponse(
              500,
              err.message,
              res
            );

          if (result.affectedRows === 0) {
            return errorResponse(
              400,
              "Cannot deactivate user",
              res
            );
          }

          db.query(
            `INSERT INTO log_users (id_user, id_user_aksi, keterangan_aksi) VALUES ('${req.query.id}', '${data.id_user}', 'Menonaktifkan user')`,
            (err, result) => {
              if (err)
                return errorResponse(
                  500,
                  err.message,
                  res
                );
              next();
            }
          );
        }
      );
    }
  } else if (req.query.stat === "aktif") {
    const data = req.tokenDecode;

    if (!data) return errorResponse(401, "Invalid token", res);

    if (!req.query.id || req.query.id === undefined){
      return errorResponse(400, "Invalid params", res)
    }

    if (data.role === "Karyawan")
      return errorResponse(403, "Access denied", res);

    if (data.role === "Supervisor") {
      const sql = `UPDATE users SET status_user = ?, updated_at = ? WHERE id = ? AND id_role = 'KRY'`;
      db.query(
        sql,
        [req.query.stat, dateFormat, req.query.id],
        (err, result) => {
          if (err)
            return errorResponse(
              500,
              err.message,
              res
            );

          if (result.affectedRows === 0) {
            return errorResponse(
              400,
              "Cannot activate user",
              res
            );
          }

          db.query(
            `INSERT INTO log_users (id_user, id_user_aksi, keterangan_aksi) VALUES ('${req.query.id}', '${data.id_user}', 'Mengaktifkan user')`,
            (err, result) => {
              if (err)
                return errorResponse(
                  500,
                  err.message,
                  res
                );
              next();
            }
          );
        }
      );
    }

    if (data.role === "Superadmin") {
      const sql = `UPDATE users SET status_user = ?, updated_at = ? WHERE ? && id_role != 'SU'`;
      db.query(
        sql,
        [req.query.stat, dateFormat, req.query.id],
        (err, result) => {
          if (err)
            return errorResponse(
              500,
              err.message,
              res
            );

          if (result.affectedRows === 0) {
            return errorResponse(
              400,
              "Cannot activate user",
              res
            );
          }

          db.query(
            `INSERT INTO log_users (id_user, id_user_aksi, keterangan_aksi) VALUES ('${req.query.id}', '${data.id_user}', 'Mengaktifkan user')`,
            (err, result) => {
              if (err)
                return errorResponse(
                  500,
                  err.message,
                  res
                );
              next();
            }
          );
        }
      );
    }
  } else {
    return errorResponse(400, "Invalid params", res)
  }
};

module.exports = updateStatus;
