
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const Contact = require('./models/Contact');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected Successfully!');
  })
  .catch((error) => {
    console.log('MongoDB Connection Error:', error.message);
  });

// Home Route
app.get('/', (req, res) => {
  res.send('Portfolio Backend is Running!');
});

// Health Route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Backend is working successfully!'
  });
});

// Contact Form API
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const newContact = new Contact({
      name,
      email,
      message
    });

    await newContact.save();

    res.status(201).json({
      success: true,
      message: 'Contact saved successfully!'
    });

  } catch (error) {
    console.error('Contact Error:', error.message);

    res.status(500).json({
      success: false,
      message: 'Something went wrong'
    });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
