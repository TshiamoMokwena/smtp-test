const { drizzle } = require('drizzle-orm/node-postgres');
const { Pool } = require('pg');
const schema = require('./schema');

// Validate DATABASE_URL exists
if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL is not set in environment variables');
    throw new Error('DATABASE_URL environment variable is required');
}

console.log('🔌 Connecting to database...');
console.log('📍 Database URL:', process.env.DATABASE_URL.replace(/:[^:@]+@/, ':****@')); // Hide password

// Configure connection pool with better settings for cPanel
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes('neon.tech') || process.env.DATABASE_URL.includes('sslmode=require')
        ? { rejectUnauthorized: false }
        : false,
    max: 10, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
    connectionTimeoutMillis: 10000, // Return an error after 10 seconds if connection could not be established
});

// Handle pool errors
pool.on('error', (err) => {
    console.error('❌ Unexpected database pool error:', {
        message: err.message,
        code: err.code,
        stack: err.stack
    });
});

// Test connection on startup (async version for better error handling)
(async () => {
    try {
        const client = await pool.connect();
        console.log('✅ Database pool connected successfully');

        const result = await client.query('SELECT NOW() as current_time, version() as db_version');
        console.log('✅ Database connection test successful');
        console.log('📅 Database time:', result.rows[0].current_time);
        console.log('🗄️  Database version:', result.rows[0].db_version.split(' ').slice(0, 2).join(' '));

        client.release();
    } catch (err) {
        console.error('❌ Database connection test failed:');
        console.error('   Message:', err.message);
        console.error('   Code:', err.code);
        console.error('   Detail:', err.detail);
        console.error('   Hint:', err.hint);
        console.error('   Full error:', err);
    }
})();

const db = drizzle(pool, { schema });

module.exports = db;
