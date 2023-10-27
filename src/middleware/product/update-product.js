const errorResponse = require("../../response/error-response.js");
const db = require("../../application/config.js");
const express = require("express");
const app = express();

app.use(express.json());

const updateProduct = (req, res, next) => {
  const data = req.tokenDecode;

  if (!data) return errorResponse(401, "Invalid token", "Unauthorized", res);

  const updateData = req.body;
  const idProduct = req.params.id;

  const sql = `UPDATE barang SET ? WHERE id = ?`;
  db.query(sql, [updateData, idProduct], (err, result) => {
    if (err) return errorResponse(500, err.message, "Internal server error", res);

    if (result.affectedRows == 0) {
      return errorResponse(400, "Invalid data", "Bad request", res);
    }

    next();
  });
};

module.exports = updateProduct;
