const db = require('../db');
const { users } = require('../db/schema');
const { eq } = require('drizzle-orm');

exports.createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }

        console.log(`Attempting to create user: ${name} (${email})`);

        // MySQL doesn't support .returning(), so we insert and then fetch
        await db.insert(users).values({ name, email });

        // Fetch the newly created user
        const [newUser] = await db.select().from(users).where(eq(users.email, email));

        console.log('User created successfully:', newUser);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('❌ Error creating user:', {
            message: error.message,
            code: error.code,
            detail: error.detail,
            stack: error.stack
        });

        // Handle duplicate email error (MySQL error code)
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Return detailed error information
        res.status(500).json({
            error: 'Failed to create user',
            details: error.message,
            code: error.code || 'UNKNOWN',
            hint: error.hint || 'Check server logs for more details'
        });
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
