const express = require('express');
const router = express.Router();
const { sendWelcomeEmail } = require('../controllers/emailController');

// POST /api/send-welcome-email
router.post('/send-welcome-email', sendWelcomeEmail);

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is healthy',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
