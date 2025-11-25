const db = require('../db');
const { users } = require('../db/schema');

exports.createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }

        const result = await db.insert(users).values({ name, email }).returning();
        res.status(201).json(result[0]);
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.code === '23505') {
            return res.status(400).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: 'Failed to create user', details: error.message });
    }
};
const db = require('../db');
const { users } = require('../db/schema');

exports.createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }

        const result = await db.insert(users).values({ name, email }).returning();
        res.status(201).json(result[0]);
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.code === '23505') {
            return res.status(400).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: 'Failed to create user', details: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const allUsers = await db.select().from(users);
        res.json(allUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            error: 'Failed to fetch users',
            details: error.message,
            code: error.code
        });
    }
};
