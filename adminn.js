const express = require('express');
const authenticateJWT = require('./middleware/authenticateJWT');
const isAdmin = require('./Admin');
const User = require('./User');

const router = express.Router();

router.get('/users', authenticateJWT, isAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

module.exports = router;
