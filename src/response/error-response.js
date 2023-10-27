const errorResponse = (statusCode, msg, stat, res) => {
  res.status(statusCode).json([
    {
      message: msg,
      status_code: {
        code: statusCode,
        status: stat,
      }
    },
  ]);
};

module.exports = errorResponse;
