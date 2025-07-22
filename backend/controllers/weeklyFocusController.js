import WeeklyFocus from '../models/weeklyFocus.js';

export const createWeeklyFocus = async (req, res) => {
  try {
    const { title, description, weekStartDate, status, priority } = req.body;

    if (!title || !weekStartDate) {
      return res
        .status(400)
        .json({ message: 'Title and weekStartDate are required' });
    }

    const newFocus = await WeeklyFocus.create({
      user: req.user._id,
      title,
      description,
      weekStartDate,
      status,
      priority,
    });

    res.status(201).json(newFocus);
  } catch (error) {
    console.error('Error creating focus:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
