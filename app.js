const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const User = require('../models/User');
const Chat = require('../models/Chat');

// User registration
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Get chat history
router.get('/chats', authMiddleware, async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chat history' });
  }
});

// Save chat
router.post('/chats', authMiddleware, async (req, res) => {
  try {
    const { messages } = req.body;
    const chat = new Chat({ user: req.userId, messages });
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: 'Error saving chat' });
  }
});

// Generate AI response
router.post('/generate', authMiddleware, async (req, res) => {
  try {
    const { api, model, message } = req.body;
    let response;

    if (api === 'openrouter') {
      response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
        model,
        messages: [{ role: 'user', content: message }]
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
    } else if (api === 'gemini') {
      response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        contents: [{ parts: [{ text: message }] }]
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
    } else {
      return res.status(400).json({ message: 'Invalid API selected' });
    }

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error generating AI response' });
  }
});

module.exports = router;
