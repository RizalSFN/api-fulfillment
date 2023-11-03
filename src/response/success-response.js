const http = require("http");
const successResponse = (statusCode, data, msg, res) => {
  res.status(statusCode).json([
    {
      message: msg,
      note: "Success",
      payload: data,
      status_code: {
        code: statusCode,
        status: http.STATUS_CODES[statusCode],
      },
    },
  ]);
};

module.exports = successResponse;
