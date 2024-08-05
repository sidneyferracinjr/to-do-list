const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'todolist',
});

module.exports = connection;