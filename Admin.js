const User = require('/User');

const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.userId);
  if (user && user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Access denied. Admins only.' });
  }
};

module.exports = isAdmin;
