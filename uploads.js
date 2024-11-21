const express = require('express');
const multer = require('multer');
const authenticateJWT = require('./middleware/authenticateJWT'); // Middleware to protect the route

const upload = multer({ dest: 'uploads/' }); // Define the destination folder
const router = express.Router();

// File upload route
router.post('/upload', authenticateJWT, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.status(200).json({
    message: 'File uploaded successfully',
    file: {
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
    },
  });
});

module.exports = router;
