export const validateWeeklyFocus = (req, res, next) => {
  const { status, priority } = req.body;

  const validStatus = ['pending', 'in-progress', 'completed'];
  const validPriority = ['low', 'medium', 'high'];

  if (status && !validStatus.includes(status)) {
    return res.status(400).json({ message: `Invalid status value: ${status}` });
  }

  if (priority && !validPriority.includes(priority)) {
    return res
      .status(400)
      .json({ message: `Invalid priority value: ${priority}` });
  }

  next();
};
