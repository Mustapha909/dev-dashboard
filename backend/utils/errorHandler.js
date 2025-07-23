export const handleServerError = (
  res,
  error,
  customMessage = 'Server error'
) => {
  console.error(error);
  res.status(500).json({ message: customMessage });
};
