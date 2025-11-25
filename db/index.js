const { drizzle } = require('drizzle-orm/mysql2');
const mysql = require('mysql2/promise');
const schema = require('./schema');

// Validate DATABASE_URL exists
if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL is not set in environment variables');
    throw new Error('DATABASE_URL environment variable is required');
}

console.log('🔌 Connecting to MySQL database...');
console.log('📍 Database URL:', process.env.DATABASE_URL.replace(/:[^:@]+@/, ':****@')); // Hide password

// Create MySQL connection pool
const pool = mysql.createPool({
    uri: process.env.DATABASE_URL,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

// Test connection on startup
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ MySQL pool connected successfully');

        const [rows] = await connection.query('SELECT NOW() as `current_time`, VERSION() as db_version');
        console.log('✅ Database connection test successful');
        console.log('📅 Database time:', rows[0].current_time);
        console.log('🗄️  Database version:', rows[0].db_version);

        connection.release();
    } catch (err) {
        console.error('❌ Database connection test failed:');
        console.error('   Message:', err.message);
        console.error('   Code:', err.code);
        console.error('   SQL State:', err.sqlState);
        console.error('   SQL Message:', err.sqlMessage);
        console.error('   Full error:', err);
    }
})();

const db = drizzle(pool, { schema, mode: 'default' });

module.exports = db;
