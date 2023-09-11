const errorResponse = require("../../response/error-response.js");
const db = require("../../application/config.js");

const statusProduct = (req, res, next) => {
  const data = req.tokenDecode;

  if (!data) return errorResponse(403, "Invalid token", res);

  const sql = `UPDATE varian SET status_varian = ? WHERE id = ?`;
  db.query(sql, [req.params.statusVarian, req.params.id], (err, result) => {
    if (err) return errorResponse(500, "Internal server error", res);

    if (result.affectedRows == 0) {
      return errorResponse(400, "Invalid data", res);
    }

    next();
  });
};

module.exports = statusProduct;
