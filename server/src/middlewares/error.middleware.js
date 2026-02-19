import logger from "../utils/logger.js";

export default (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  logger.error(err);

  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || "Internal Server Error",
      code: statusCode,
    },
  });
};
