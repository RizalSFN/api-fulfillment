const errorResponse = (statusCode, msg, res) => {
  res.status(statusCode).json([
    {
      message: msg,
    },
  ]);
};

module.exports = errorResponse;
