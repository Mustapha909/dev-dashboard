export const validateLearningLog = (req, res, next) => {
  const { topic, date, notes } = req.body;

  if (!topic || typeof topic !== 'string') {
    return res
      .status(400)
      .json({ message: 'Topic is required and must be a string' });
  }

  if (!date || isNaN(Date.parse(date))) {
    return res
      .status(400)
      .json({ message: 'Date is required and must be a valid date' });
  }

  if (notes && typeof notes !== 'string') {
    return res.status(400).json({ message: 'Notes must be a string' });
  }

  next();
};
