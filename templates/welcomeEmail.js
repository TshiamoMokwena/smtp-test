const getWelcomeEmailTemplate = (userEmail) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome!</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border-radius: 8px; overflow: hidden;">
                    
                    <!-- Header Section with Gradient -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 50px 40px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 36px; font-weight: 700; letter-spacing: -0.5px;">
                                Welcome Aboard! 🎉
                            </h1>
                            <p style="margin: 15px 0 0 0; color: #ffffff; font-size: 18px; opacity: 0.95;">
                                We're thrilled to have you with us
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 50px 40px;">
                            <h2 style="margin: 0 0 20px 0; color: #2d3748; font-size: 24px; font-weight: 600;">
                                Hello there! 👋
                            </h2>
                            <p style="margin: 0 0 20px 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                                Thank you for joining our community! We're excited to have you on board and can't wait to help you get started on your journey with us.
                            </p>
                            <p style="margin: 0 0 30px 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                                Your account has been successfully created with the email: <strong style="color: #667eea;">${userEmail}</strong>
                            </p>
                            
                            <!-- Feature Cards -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0;">
                                <tr>
                                    <td style="padding: 20px; background-color: #f7fafc; border-radius: 8px; border-left: 4px solid #667eea;">
                                        <h3 style="margin: 0 0 10px 0; color: #2d3748; font-size: 18px; font-weight: 600;">
                                            🚀 Get Started
                                        </h3>
                                        <p style="margin: 0; color: #4a5568; font-size: 14px; line-height: 1.5;">
                                            Explore our platform and discover all the amazing features we have to offer.
                                        </p>
                                    </td>
                                </tr>
                                <tr><td style="height: 15px;"></td></tr>
                                <tr>
                                    <td style="padding: 20px; background-color: #f7fafc; border-radius: 8px; border-left: 4px solid #764ba2;">
                                        <h3 style="margin: 0 0 10px 0; color: #2d3748; font-size: 18px; font-weight: 600;">
                                            💡 Learn More
                                        </h3>
                                        <p style="margin: 0; color: #4a5568; font-size: 14px; line-height: 1.5;">
                                            Check out our documentation and tutorials to make the most of your experience.
                                        </p>
                                    </td>
                                </tr>
                                <tr><td style="height: 15px;"></td></tr>
                                <tr>
                                    <td style="padding: 20px; background-color: #f7fafc; border-radius: 8px; border-left: 4px solid #48bb78;">
                                        <h3 style="margin: 0 0 10px 0; color: #2d3748; font-size: 18px; font-weight: 600;">
                                            🤝 Get Support
                                        </h3>
                                        <p style="margin: 0; color: #4a5568; font-size: 14px; line-height: 1.5;">
                                            Our support team is here to help you whenever you need assistance.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- CTA Button -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 40px 0 30px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="#" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 50px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); transition: all 0.3s ease;">
                                            Get Started Now
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 0 0 20px 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                                If you have any questions or need help, don't hesitate to reach out to us. We're here to make your experience amazing!
                            </p>
                            
                            <p style="margin: 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                                Best regards,<br>
                                <strong style="color: #2d3748;">The Team</strong>
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #2d3748; padding: 30px 40px; text-align: center;">
                            <p style="margin: 0 0 15px 0; color: #a0aec0; font-size: 14px;">
                                © ${new Date().getFullYear()} Your Company. All rights reserved.
                            </p>
                            <table role="presentation" style="margin: 0 auto; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 0 10px;">
                                        <a href="#" style="color: #667eea; text-decoration: none; font-size: 14px;">Website</a>
                                    </td>
                                    <td style="color: #a0aec0;">•</td>
                                    <td style="padding: 0 10px;">
                                        <a href="#" style="color: #667eea; text-decoration: none; font-size: 14px;">Privacy Policy</a>
                                    </td>
                                    <td style="color: #a0aec0;">•</td>
                                    <td style="padding: 0 10px;">
                                        <a href="#" style="color: #667eea; text-decoration: none; font-size: 14px;">Contact</a>
                                    </td>
                                </tr>
                            </table>
                            <p style="margin: 20px 0 0 0; color: #718096; font-size: 12px; line-height: 1.5;">
                                You received this email because you signed up for our service.<br>
                                If you didn't sign up, please ignore this email.
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
};

module.exports = { getWelcomeEmailTemplate };
