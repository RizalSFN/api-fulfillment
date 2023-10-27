const db = require("../application/config.js");
const jwt = require("jsonwebtoken");
const errorResponse = require("../response/error-response.js");
require("dotenv").config();
const secret_key = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  const token = req.cookies.TokenJWT;

  if (!token) {
    return errorResponse(401, "Invalid token", "Unauthorized", res);
  }

  db.query(
    `SELECT * FROM token_akses WHERE token = '${token}'`,
    (err, result) => {
      if (err) return errorResponse(500, "Internal server error", res);

      jwt.verify(token, secret_key, (err, result) => {
        if (err) {
          if (err.message == "jwt expired") {
            db.query(
              `DELETE FROM token_akses WHERE token = '${token}'`,
              (err, result) => {
                if (err) return err.message;
              }
            );
          }
        }

        req.tokenKukis = token;
        req.tokenDecode = result;
        next();
      });
    }
  );
};

module.exports = verifyToken;
