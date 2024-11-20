const express = require('express');
const Feedback = require('C:\\Users\\Cynthia\\Downloads\\undeviating\\Feedback.js');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

// Submit Feedback
router.post('/send_message', authenticateJWT, async (req, res) => {
  const { content } = req.body;

  try {
    const feedback = new Feedback({ userId: req.user.userId, content });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error submitting feedback' });
  }
});

module.exports = router;
