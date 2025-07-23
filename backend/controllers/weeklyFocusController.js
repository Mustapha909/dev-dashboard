import WeeklyFocus from '../models/WeeklyFocus.js';
import { handleServerError } from '../utils/errorHandler.js';
import { checkOwnershipOrFail } from '../utils/checkOwnership.js';
import { parse } from 'dotenv';

// continue with logic

export const createWeeklyFocus = async (req, res) => {
  try {
    const { title, description, weekStartDate, status, priority } = req.body;

    if (!title || !weekStartDate) {
      return res
        .status(400)
        .json({ message: 'Title and week start date are required' });
    }

    const newWeeklyFocus = new WeeklyFocus({
      user: req.user._id,
      title,
      description,
      weekStartDate,
      status,
      priority,
    });

    await newWeeklyFocus.save();

    res.status(201).json({ newWeeklyFocus });
  } catch (error) {
    handleServerError(res, error, 'Could not fetch weekly focus item');
  }
};

// @desc    Get all weekly focus items for logged-in user
// @route   GET /api/focus
// @access  Private
export const getWeeklyFocus = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Base filter for current user
    const filter = { user: req.user._id };

    // Add filters based on query parameters
    if (req.query.status) {
      filter.status = req.query.status; // Example: status=Completed
    }

    if (req.query.priority) {
      filter.priority = parseInt(req.query.priority); // priority=1
    }

    if (req.query.startDate && req.query.endDate) {
      filter.weekStartDate = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate),
      };
    }

    const total = await WeeklyFocus.countDocuments(filter);

    const weeklyFocus = await WeeklyFocus.find(filter)
      .sort({ weekStartDate: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      data: weeklyFocus,
    });
  } catch (error) {
    handleServerError(res, error, 'Could not fetch weekly focus items');
  }
};

// @desc   Get a single weekly focus item by ID
// @route  GET /api/weeklyFocus/:id
// @access Private
export const getWeeklyFocusById = async (req, res) => {
  try {
    const focusWeeklyItem = await WeeklyFocus.findById(req.params.id);

    if (!focusWeeklyItem) {
      return res.status(404).json({ message: 'Weekly focus not found' });
    }

    if (!checkOwnershipOrFail(res, focusWeeklyItem.user, req.user._id)) return;

    res.status(200).json(focusWeeklyItem);
  } catch (error) {
    handleServerError(res, error, 'Could not fetch weekly focus item');
  }
};

export const updateWeeklyFocus = async (req, res) => {
  try {
    const focusUpdateItem = await WeeklyFocus.findById(req.params.id);

    if (!focusUpdateItem) {
      return res.status(404).json({ message: 'Weekly focus not found' });
    }

    if (!checkOwnershipOrFail(res, focusUpdateItem.user, req.user._id)) return;

    const { title, description, weekStartDate, status, priority } = req.body;

    if (title !== undefined) focusUpdateItem.title = title;
    if (description !== undefined) focusUpdateItem.description = description;
    if (weekStartDate !== undefined)
      focusUpdateItem.weekStartDate = weekStartDate;
    if (status !== undefined) focusUpdateItem.status = status;
    if (priority !== undefined) focusUpdateItem.priority = priority;

    const updatedWeeklyFocusItem = await focusUpdateItem.save();
    res.status(200).json(updatedWeeklyFocusItem);
  } catch (error) {
    handleServerError(res, error, 'Could not fetch weekly focus item');
  }
};

export const deleteWeeklyFocus = async (req, res) => {
  try {
    const focusWeeklyItem = await WeeklyFocus.findById(req.params.id);

    if (!focusWeeklyItem) {
      return res.status(404).json({ message: 'Weekly focus not found' });
    }

    if (!checkOwnershipOrFail(res, focusWeeklyItem.user, req.user._id)) return;

    await focusWeeklyItem.deleteOne();

    res.status(200).json({ message: 'Weekly focus deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
