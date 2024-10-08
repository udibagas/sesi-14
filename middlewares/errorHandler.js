exports.errorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    error: err.name,
    message: err.message,
  });
};
