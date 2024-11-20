const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Load environment variables
dotenv.config();

const app = express();
app.use(bodyParser.json());

// Import routes
const authRoutes = require('./auth');
const feedbackRoutes = require('./feedbackk');

// Middleware for routes
app.use('/auth', authRoutes);
app.use('/feedbackk', feedbackRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
 res.send('Hello, World!'); 
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
