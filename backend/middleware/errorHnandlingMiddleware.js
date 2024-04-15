const errorHandlingMiddleware = (error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong in the application.";
  res.status(status).json({ error: message });
};

module.exports = errorHandlingMiddleware;
