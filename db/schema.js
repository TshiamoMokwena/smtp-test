const { mysqlTable, varchar, int, timestamp } = require('drizzle-orm/mysql-core');

const users = mysqlTable('users', {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    createdAt: timestamp('created_at').defaultNow(),
});

module.exports = { users };
