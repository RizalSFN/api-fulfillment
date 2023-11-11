const http = require("http");
const successResponse = (statusCode, data, msg, res, pagination) => {
  // if (pagination || pagination !== undefined) {
    res.status(statusCode).json([
      {
        message: msg,
        note: "Success",
        payload: data,
        status_code: {
          code: statusCode,
          status: http.STATUS_CODES[statusCode],
        },
        metadata: (pagination) ? pagination : "",
      },
    ]);
  // // } else {
  //   res.status(statusCode).json([
  //     {
  //       message: msg,
  //       note: "Success",
  //       payload: data,
  //       status_code: {
  //         code: statusCode,
  //         status: http.STATUS_CODES[statusCode],
  //       },
  //     },
  //   ]);
  // }
};

module.exports = successResponse;
