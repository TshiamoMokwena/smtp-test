const { drizzle } = require('drizzle-orm/node-postgres');
const { Pool } = require('pg');
const schema = require('./schema');

// Validate DATABASE_URL exists
if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL is not set in environment variables');
    throw new Error('DATABASE_URL environment variable is required');
}

// Configure connection pool with better settings for cPanel
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes('neon.tech')
        ? { rejectUnauthorized: false }
        : false,
    max: 10, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
    connectionTimeoutMillis: 10000, // Return an error after 10 seconds if connection could not be established
});

// Test the connection
pool.on('connect', () => {
    console.log('✅ Database connected successfully');
});

pool.on('error', (err) => {
    console.error('❌ Unexpected database error:', err);
});

// Test connection on startup
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Database connection test failed:', err.message);
    } else {
        console.log('✅ Database connection test successful at:', res.rows[0].now);
    }
});

const db = drizzle(pool, { schema });

module.exports = db;
