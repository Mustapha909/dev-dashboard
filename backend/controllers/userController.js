import User from '../models/User.js';

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Logout user
export const logoutUser = (req, res) => {
  res.status(200).json({ message: 'User logged out successfully' });
};
