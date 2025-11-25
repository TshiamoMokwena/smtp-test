const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const mysql = require('mysql2/promise');

router.post('/', userController.createUser);
router.get('/', userController.getUsers);

// Database health check endpoint
router.get('/health', async (req, res) => {
    let connection;
    try {
        const pool = mysql.createPool({
            uri: process.env.DATABASE_URL
        });

        connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT NOW() as current_time, VERSION() as db_version');
        connection.release();
        await pool.end();

        res.json({
            status: 'healthy',
            database: 'connected',
            timestamp: rows[0].current_time,
            version: rows[0].db_version
        });
    } catch (error) {
        if (connection) connection.release();
        console.error('Health check failed:', error);
        res.status(500).json({
            status: 'unhealthy',
            database: 'disconnected',
            error: error.message,
            code: error.code,
            sqlState: error.sqlState
        });
    }
});

module.exports = router;
