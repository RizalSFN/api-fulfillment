const http = require("http");
const errorResponse = (statusCode, msg, res) => {
  res.status(statusCode).json([
    {
      message: msg,
      note: "Error",
      status_code: {
        code: statusCode,
        status: http.STATUS_CODES[statusCode],
      },
    },
  ]);
};

module.exports = errorResponse;
