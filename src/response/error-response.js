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
    // {
    //   message: "...",
    //   note: "...",
    //   status_code: {
    //     code: "...",
    //     status: "..."
    //   }
    // }
  ]);
};

module.exports = errorResponse;
