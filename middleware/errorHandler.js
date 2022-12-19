function errorHandler(err, req, res, next) {
  if (err) throw err;
  // res.status(err.status || 500);
  res.send({ Error: true, message: err.message || "Internal Server Error" });
}

module.exports = errorHandler;
