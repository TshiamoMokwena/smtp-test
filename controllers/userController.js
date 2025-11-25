const db = require('../db');
const { users } = require('../db/schema');

exports.createUser = async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};
