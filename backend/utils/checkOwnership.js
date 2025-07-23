export const checkOwnershipOrFail = (res, resourceUserId, loggedInUserId) => {
  if (resourceUserId.toString() !== loggedInUserId.toString()) {
    res.status(403).json({ message: 'Not authorized' });
    return false;
  }
  return true;
};
