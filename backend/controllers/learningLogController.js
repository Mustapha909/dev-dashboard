import LearningLog from '../models/LearningLog.js';
import { checkOwnershipOrFail } from '../utils/checkOwnership.js';
import { handleServerError } from '../utils/errorHandler.js';

// Create a new learning log
export const createLearningLog = async (req, res) => {
  try {
    const { topic, notes, date } = req.body;
    if (!date || !topic) {
      return res.status(400).json({ message: 'Date and topic are required' });
    }

    const newLog = new LearningLog({
      user: req.user._id,
      date,
      topic,
      notes,
    });
    const savedNewLog = await newLog.save();
    res.status(201).json(savedNewLog);
  } catch (error) {
    handleServerError(res, error, 'Failed to create learning log');
  }
};

// Get all learning logs for the authenticated user
export const getLearningLogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const { startDate, endDate, search } = req.query;

    const filter = { user: req.user._id };

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }
    // filter by topic
    if (search) filter.topic = { $regex: search, $options: 'i' };

    const skip = (page - 1) * limit;
    const total = await LearningLog.countDocuments(filter);

    const logs = await LearningLog.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      currentPage: page,
      totalItem: total,
      data: logs,
    });
  } catch (error) {
    handleSeverError(res, error, 'Failed to fetch learning logs');
  }
};

// get a single learning log by ID
export const getLearningLogById = async (req, res) => {
  try {
    const log = await LearningLog.findById(req.params.id);
    if (!log) {
      return res.status(404).json({ message: 'Learning log not found' });
    }
    if (!checkOwnershipOrFail(res, log.user, req.user._id)) return;

    res.status(200).json(log);
  } catch (error) {
    handleServerError(res, error, 'Failed to fetch learning log');
  }
};

// Update a learning log
export const updateLearningLog = async (req, res) => {
  try {
    const log = await LearningLog.findById(req.params.id);
    if (!log)
      return res.status(404).json({ message: 'Learning log not found' });
    if (!checkOwnershipOrFail(res, log.user, req.user._id)) return;

    const { topic, notes, date } = req.body;
    if (date) log.date = date;
    if (topic) log.topic = topic;
    if (notes) log.notes = notes;

    const updatedLog = await log.save();
    res.status(200).json(updatedLog);
  } catch (error) {
    handleServerError(res, error, 'Failed to update learning log');
  }
};

// Delete a learning log
export const deleteLearningLog = async (req, res) => {
  try {
    const log = await LearningLog.findById(req.params.id);
    if (!log)
      return res.status(404).json({ message: 'Learning log not found' });
    if (!checkOwnershipOrFail(res, log.user, req.user._id)) return;

    await log.deleteOne();
    res.status(200).json({ message: 'Learning log deleted successfully' });
  } catch (error) {
    handleServerError(res, error, 'Failed to delete learning log');
  }
};
