export const handleError = (res, err) => {
  console.log(err.message);
  res.status(500).json({
    status: "Error",
    error: err.message,
  });
};
