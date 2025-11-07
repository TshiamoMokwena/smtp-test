const { createTransporter } = require('../config/emailConfig');
const { getWelcomeEmailTemplate } = require('../templates/welcomeEmail');

// Send welcome email
const sendWelcomeEmail = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required'
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address format'
      });
    }

    // Create transporter
    const transporter = createTransporter();

    // Get email template
    const htmlContent = getWelcomeEmailTemplate(email);

    // Email options
    const mailOptions = {
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: '🎉 Welcome to Our Platform!',
      html: htmlContent,
      text: `Welcome! Thank you for joining our community. Your account has been successfully created with the email: ${email}`
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log(`✅ Welcome email sent to ${email}`);
    console.log('Message ID:', info.messageId);

    res.status(200).json({
      success: true,
      message: 'Welcome email sent successfully',
      recipient: email,
      messageId: info.messageId
    });

  } catch (error) {
    console.error('❌ Error sending email:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to send welcome email',
      error: error.message
    });
  }
};

module.exports = { sendWelcomeEmail };
