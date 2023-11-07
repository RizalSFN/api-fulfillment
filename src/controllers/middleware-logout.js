const db = require("../application/config.js");
const errorResponse = require("../response/error-response.js");

const logoutMiddleware = (req, res, next) => {
  const token = req.tokenKukis;
  db.query(
    `DELETE FROM token_akses WHERE token = '${token}'`,
    (err, result) => {
      if (err) throw errorResponse(500, err.message, res);

      db.query(
        `INSERT INTO history_users (id_user_aksi, keterangan_aksi) VALUES ('${req.tokenDecode.id_user}', 'Melakukan logout')`,
        (err, result) => {
          if (err) return errorResponse(500, err.message, res);
          next();
        }
      );
    }
  );
};

module.exports = logoutMiddleware;
