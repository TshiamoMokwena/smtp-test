# Simple Email API Server

A Node.js + Express API server that sends beautiful welcome emails using SMTP.

## Features

- 📧 Send stunning HTML welcome emails
- 🎨 Modern, responsive email design with gradient headers
- 🚀 Simple REST API endpoint
- 🔒 Environment variable configuration
- ✅ Email validation

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Edit the `.env` file with your SMTP credentials:

```env
PORT=3000

# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Email Configuration
FROM_EMAIL=your-email@gmail.com
FROM_NAME=Your Company Name
```

### Gmail Setup (if using Gmail)

1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Generate an App Password:
   - Go to Security → 2-Step Verification → App passwords
   - Select "Mail" and your device
   - Copy the generated password and use it as `SMTP_PASS`

### 3. Start the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Send Welcome Email

**Endpoint:** `POST /api/send-welcome-email`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Welcome email sent successfully",
  "recipient": "user@example.com",
  "messageId": "<message-id>"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message here"
}
```

### Health Check

**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "success": true,
  "message": "API is healthy",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Testing with cURL

```bash
curl -X POST http://localhost:3000/api/send-welcome-email -H "Content-Type: application/json" -d "{\"email\":\"test@example.com\"}"
```

## Testing with Postman

1. Create a new POST request
2. URL: `http://localhost:3000/api/send-welcome-email`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
   ```json
   {
     "email": "test@example.com"
   }
   ```

## Project Structure

```
simple-api/
├── config/
│   └── emailConfig.js       # SMTP configuration
├── controllers/
│   └── emailController.js   # Email sending logic
├── routes/
│   └── emailRoutes.js       # API routes
├── templates/
│   └── welcomeEmail.js      # HTML email template
├── .env                     # Environment variables
├── .env.example             # Example environment variables
├── .gitignore              # Git ignore file
├── package.json            # Dependencies
├── server.js               # Main server file
└── README.md               # This file
```

## Email Template Features

The welcome email includes:
- 🎨 Beautiful gradient header
- 📱 Responsive design
- 🎯 Feature highlights with cards
- 🔘 Call-to-action button
- 📄 Professional footer with links
- ✨ Modern styling with shadows and rounded corners

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `SMTP_HOST` | SMTP server host | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP server port | `587` |
| `SMTP_SECURE` | Use SSL/TLS | `false` |
| `SMTP_USER` | SMTP username | `your-email@gmail.com` |
| `SMTP_PASS` | SMTP password | `your-app-password` |
| `FROM_EMAIL` | Sender email | `your-email@gmail.com` |
| `FROM_NAME` | Sender name | `Your Company Name` |

## Troubleshooting

### Email not sending

1. Check your SMTP credentials
2. For Gmail, make sure you're using an App Password, not your regular password
3. Check if your SMTP port is correct (587 for TLS, 465 for SSL)
4. Verify your firewall isn't blocking SMTP connections

### Common SMTP Providers

| Provider | Host | Port | Secure |
|----------|------|------|--------|
| Gmail | smtp.gmail.com | 587 | false |
| Outlook | smtp-mail.outlook.com | 587 | false |
| Yahoo | smtp.mail.yahoo.com | 465 | true |
| SendGrid | smtp.sendgrid.net | 587 | false |

## License

ISC
