# MySQL Setup Guide for cPanel

This guide will help you set up a MySQL database on your cPanel server for the Simple API application.

## Step 1: Create MySQL Database in cPanel

1. **Log in to cPanel**
2. **Navigate to MySQL Databases**
   - Find "MySQL Databases" in the Databases section
3. **Create a New Database**
   - Database Name: `apidb` (cPanel will prefix it with your username, e.g., `cpanel_user_apidb`)
   - Click "Create Database"
4. **Create a Database User**
   - Username: `apiuser` (will be prefixed, e.g., `cpanel_user_apiuser`)
   - Password: Generate a strong password
   - Click "Create User"
5. **Add User to Database**
   - Select the user you just created
   - Select the database you just created
   - Grant **ALL PRIVILEGES**
   - Click "Make Changes"

## Step 2: Get Your Connection Details

After creating the database, note these details:
- **Database Name**: `cpanel_user_apidb` (with your actual cPanel username)
- **Database User**: `cpanel_user_apiuser`
- **Database Password**: The password you set
- **Host**: `localhost` (for cPanel local MySQL)
- **Port**: `3306` (default MySQL port)

## Step 3: Update .env File

Create or update your `.env` file with the MySQL connection string:

```env
# Server Configuration
PORT=3000

# Database Configuration
DATABASE_URL=mysql://cpanel_user_apiuser:your_password@localhost:3306/cpanel_user_apidb

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

**Replace:**
- `cpanel_user_apiuser` with your actual database username
- `your_password` with your database password
- `cpanel_user_apidb` with your actual database name

## Step 4: Install Dependencies

In your project directory (locally first, then on cPanel):

```bash
npm install
```

This will install the new `mysql2` package and remove the old `pg` package.

## Step 5: Run Database Migrations

Generate and push the schema to your MySQL database:

```bash
# Generate migration files
npx drizzle-kit generate

# Push schema to database (creates the tables)
npx drizzle-kit push
```

When prompted, confirm that you want to apply the changes.

## Step 6: Test the Connection

Start your application:

```bash
npm start
```

You should see:
```
🔌 Connecting to MySQL database...
✅ MySQL pool connected successfully
✅ Database connection test successful
📅 Database time: [timestamp]
🗄️  Database version: MySQL [version]
```

## Step 7: Test the API Endpoints

### Health Check
```bash
curl http://localhost:3000/api/users/health
```

Expected response:
```json
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2025-11-25T09:00:00.000Z",
  "version": "8.0.x"
}
```

### Create a User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}'
```

### Get All Users
```bash
curl http://localhost:3000/api/users
```

## Deployment to cPanel

### 1. Upload Files
Upload your updated code to cPanel (via Git, FTP, or file manager)

### 2. Install Dependencies on cPanel
```bash
cd /home/yourusername/api.yourdomain.com
npm install
```

### 3. Update .env on cPanel
Make sure your `.env` file has the correct MySQL connection string

### 4. Run Migrations on cPanel
```bash
npx drizzle-kit push
```

### 5. Restart Application
```bash
# If using Node.js app in cPanel
# Restart through cPanel interface

# If using PM2
pm2 restart all

# Or kill and restart
pkill -f "node server.js"
npm start
```

### 6. Test Production Endpoints
```bash
# Health check
curl https://api.yourdomain.com/api/users/health

# Create user
curl -X POST https://api.yourdomain.com/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com"}'
```

## Troubleshooting

### Connection Refused
- Make sure MySQL is running on cPanel
- Verify the database name, username, and password
- Check that the user has privileges on the database

### Table Doesn't Exist
- Run `npx drizzle-kit push` to create the tables
- Check that migrations completed successfully

### Access Denied
- Verify database user has ALL PRIVILEGES
- Check username and password in DATABASE_URL
- Make sure you're using the full prefixed username (e.g., `cpanel_user_apiuser`)

### Can't Connect to Database
- Verify `localhost` is correct (some cPanel setups use a different host)
- Check port 3306 is correct
- Try using `127.0.0.1` instead of `localhost`

## Verify Database Tables

You can verify the tables were created in cPanel:
1. Go to cPanel → phpMyAdmin
2. Select your database
3. You should see a `users` table with columns: `id`, `name`, `email`, `created_at`

## Migration Complete! 🎉

Your application is now using MySQL instead of PostgreSQL, which will work perfectly with your cPanel hosting!
