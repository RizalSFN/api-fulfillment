const db = require("../connection/config.js");
const jwt = require("jsonwebtoken");
const errorResponse = require("../response/error-response.js");
require("dotenv").config();
const secret_key = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  const auth = req.headers["authorization"];
  const token = auth && auth.split(" ")[1];

  if (!auth || auth.split(" ")[0] !== "Bearer") {
    return errorResponse(401, "Invalid authorization", res);
  }

  const myDate = new Date();
  const waktu = myDate.toLocaleTimeString();
  const tanggal = myDate.getDate();
  const bulan = myDate.getMonth();
  const tahun = myDate.getFullYear();
  const dateFormat = `${tahun}-${bulan + 1}-${tanggal} ${waktu}`;

  db.query(
    `SELECT * FROM token_akses WHERE token = '${token}'`,
    (err, results) => {
      if (err) return errorResponse(500, err.message, res);

      if (results[0] === undefined) {
        return errorResponse(401, "Invalid token", res);
      }

      if (results[0].expire_token < dateFormat) {
        db.query(
          `DELETE FROM token_akses WHERE token = '${token}'`,
          (err, result) => {
            if (err) return errorResponse(500, err.message, res);

            return errorResponse(401, "Token expired, Please re-login", res);
          }
        );
      } else {
        jwt.verify(token, secret_key, (err, result) => {
          if (err) {
            return errorResponse(500, "err.message", res);
          }

          req.tokenKukis = token;
          req.tokenDecode = result;
          next();
        });
      }
    }
  );
};

module.exports = verifyToken;
