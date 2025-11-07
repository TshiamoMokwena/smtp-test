# Test the Welcome Email API

## Using PowerShell

```powershell
$body = @{
    email = "test@example.com"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/send-welcome-email" -Method Post -Body $body -ContentType "application/json"
```

## Using cURL (if installed)

```bash
curl -X POST http://localhost:3000/api/send-welcome-email -H "Content-Type: application/json" -d "{\"email\":\"test@example.com\"}"
```

## Test with your own email

Replace `test@example.com` with your actual email address to receive the welcome email!
