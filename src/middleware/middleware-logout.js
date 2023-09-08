const db = require("../application/config.js");
const errorResponse = require("../response/error-response.js");

const logoutMiddleware = (req, res, next) => {
  const token = req.tokenKukis;
  db.query(
    `DELETE FROM token_akses WHERE token = '${token}'`,
    (err, result) => {
      if (err) throw errorResponse(500, "Internal server error 3", res);
      next();
    }
  );
};

module.exports = logoutMiddleware;
