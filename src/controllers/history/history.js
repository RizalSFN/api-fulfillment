const errorResponse = require("../../response/error-response.js");
const db = require("../../connection/config.js");

const historyUsers = (req, res, next) => {
  const data = req.tokenDecode;

  if (!data) {
    return errorResponse(401, "Invalid token", res);
  } else if (data.role === "Karyawan") {
    return errorResponse(403, "Access denied", res);
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;

  db.query("SELECT COUNT(*) as total FROM history_users", (err, result) => {
    if (err) return errorResponse(500, err.message, res);
    const total = result[0].total;
    const totalPages = Math.ceil(total / limit);

    db.query(
      `SELECT history_users.id, history_users.id_user, history_users.id_user_aksi, users.nama as nama_user_aksi, history_users.keterangan_aksi, history_users.created_at FROM history_users INNER JOIN users ON history_users.id_user_aksi = users.id LIMIT ${startIndex}, ${limit}`,
      (err, result) => {
        if (err) return errorResponse(500, err.message, res);
        if (page > totalPages) return errorResponse(404, "Data not found", res);
        const dataPage = {
          currentPage: page,
          totalPages: totalPages,
        };
        req.pagination = dataPage;
        req.dataHistory = result;
        next();
      }
    );
  });
};

const historyProducts = (req, res, next) => {
  const data = req.tokenDecode;

  if (!data) {
    return errorResponse(401, "Invalid token", res);
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;

  db.query("SELECT COUNT(*) as total FROM history_barang", (err, result) => {
    if (err) return errorResponse(500, err.message, res);
    const total = result[0].total;
    const totalPages = Math.ceil(total / limit);

    db.query(
      `SELECT history_barang.id, history_barang.id_barang, history_barang.id_user_aksi, users.nama as nama_user_aksi, history_barang.keterangan_aksi, history_barang.created_at FROM history_barang INNER JOIN users ON history_barang.id_user_aksi = users.id LIMIT ${startIndex}, ${limit}`,
      (err, result) => {
        if (err) return errorResponse(500, err.message, res);
        if (page > totalPages) return errorResponse(404, "Data not found", res);
        const dataPage = {
          currentPage: page,
          totalPages: totalPages,
        };
        req.pagination = dataPage;
        req.dataHistory = result;
        next();
      }
    );
  });
};

module.exports = {
  historyUsers,
  historyProducts,
};
