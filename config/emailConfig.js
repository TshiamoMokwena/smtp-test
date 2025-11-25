const nodemailer = require('nodemailer');

// Create transporter with SMTP configuration
const createTransporter = () => {
  // Debug logging to verify environment variables
  console.log('🔍 SMTP Configuration Check:');
  console.log('SMTP_HOST:', process.env.SMTP_HOST || 'MISSING');
  console.log('SMTP_PORT:', process.env.SMTP_PORT || 'MISSING');
  console.log('SMTP_SECURE:', process.env.SMTP_SECURE || 'MISSING');
  console.log('SMTP_USER:', process.env.SMTP_USER || 'MISSING');
  console.log('SMTP_PASS:', process.env.SMTP_PASS ? '****' + process.env.SMTP_PASS.slice(-4) : 'MISSING');

  // Remove quotes if they exist in the password
  const password = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/^["']|["']$/g, '') : '';

  const config = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: password
    },
    tls: {
      rejectUnauthorized: false
    }
  };

  // Validate credentials
  if (!config.auth.user || !config.auth.pass) {
    throw new Error('SMTP credentials are missing. Please check your .env file.');
  }

  return nodemailer.createTransport(config);
};

module.exports = { createTransporter };
