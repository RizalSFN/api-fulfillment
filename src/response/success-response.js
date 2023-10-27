const successResponse = (statusCode, data, msg, stat, res) => {
  res.status(statusCode).json([
    {
      message: msg,
      payload: data,
      status_code: {
        code: statusCode,
        status: stat,
      },
    },
  ]);
};

module.exports = successResponse;
