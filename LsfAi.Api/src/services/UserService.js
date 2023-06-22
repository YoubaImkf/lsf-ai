require('dotenv').config()
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const userService = {
    
/**
 * Get all users from the database.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of user objects.
 */
  getUsers: () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM `user`';
      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

/**
 * Create a new user in the database.
 * @param {object} user - Information about the user to be created.
 * @param {string} user.email - The user's email address.
 * @param {string} user.username - The user's username.
 * @param {string} user.password - The user's password.
 * @param {string} user.role - The user's role.
 * @returns {Promise<object>} A promise that resolves to the created user object.
 */
  createUser: (user) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO `user` (email, username, password, role) VALUES (?, ?, ?, ?)';
      const values = [user.email, user.username, user.password, user.role];
      connection.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          const insertedUserId = result.insertId;
          resolve({ id: insertedUserId, ...user });
        }
      });
    });
  },

/**
 * Get a user by their ID from the database.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<Object|null>} A promise that resolves to the user object if found, or null if not found.
 */
  getUserById: (userId) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM `user` WHERE id = ?';
      connection.query(query, [userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  },

/**
 * Update a user in the database.
 * @param {number} userId - The ID of the user to update.
 * @param {Object} userData - The updated user data.
 * @returns {Promise<Object>} A promise that resolves to the updated user object.
 */
  updateUser: (userId, userData) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE `user` SET email = ?, username = ?, password = ?, role = ? WHERE id = ?';
      const values = [userData.email, userData.username, userData.password, userData.role, userId];
      connection.query(query, values, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve({ id: userId, ...userData });
        }
      });
    });
  },

/**
 * Delete a user from the database.
 * @param {number} userId - The ID of the user to delete.
 * @returns {Promise<void>} A promise that resolves when the user is successfully deleted.
 */
  deleteUser: (userId) => {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM `user` WHERE id = ?';
      connection.query(query, [userId], (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  },
};

module.exports = userService;
