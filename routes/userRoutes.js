const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const db = require('../db');

router.post('/', userController.createUser);
router.get('/', userController.getUsers);

// Database health check endpoint
router.get('/health', async (req, res) => {
    try {
        const result = await db.execute('SELECT NOW() as current_time, version() as db_version');
        res.json({
            status: 'healthy',
            database: 'connected',
            timestamp: result.rows?.[0]?.current_time || new Date(),
            version: result.rows?.[0]?.db_version || 'unknown'
        });
    } catch (error) {
        res.status(500).json({
            status: 'unhealthy',
            database: 'disconnected',
            error: error.message,
            code: error.code
        });
    }
});

module.exports = router;
