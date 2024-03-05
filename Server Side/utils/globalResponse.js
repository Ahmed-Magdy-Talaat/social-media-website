export const globalResponse = (error, req, res, next) => {
  res.status(500).json({
    success: false,
    message: error.message,
    stack: error.stack,
  });
};
