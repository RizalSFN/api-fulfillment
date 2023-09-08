const successResponse = (statusCode, data, msg, res) => {
  res.status(statusCode).json([
    {
      message: msg,
      payload: data,
      metadata: {
        prev: "",
        next: "",
        current: "",
      },
    },
  ]);
};

module.exports = successResponse;
