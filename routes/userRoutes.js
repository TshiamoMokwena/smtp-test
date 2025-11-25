const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { Pool } = require('pg');

router.post('/', userController.createUser);
router.get('/', userController.getUsers);

// Database health check endpoint
router.get('/health', async (req, res) => {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.DATABASE_URL.includes('neon.tech') || process.env.DATABASE_URL.includes('sslmode=require')
            ? { rejectUnauthorized: false }
            : false,
    });

    try {
        const client = await pool.connect();
        const result = await client.query('SELECT NOW() as current_time, version() as db_version');
        client.release();
        await pool.end();

        res.json({
            status: 'healthy',
            database: 'connected',
            timestamp: result.rows[0].current_time,
            version: result.rows[0].db_version
        });
    } catch (error) {
        await pool.end();
        console.error('Health check failed:', error);
        res.status(500).json({
            status: 'unhealthy',
            database: 'disconnected',
            error: error.message,
            code: error.code,
            detail: error.detail
        });
    }
});

module.exports = router;
