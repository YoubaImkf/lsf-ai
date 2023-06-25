require('dotenv').config({ path: './config/.env' })
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Establish database connection
connection.connect((error) => {
  if (error) {
    console.error('Failed to connect to the database:', error);
    return;
  }
  console.log('Connected to the database');
});

module.exports = connection;
