export const errorHandler = (err, req, res, next) => {
  console.error("error:", err.message || err);

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || "internal server error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
}