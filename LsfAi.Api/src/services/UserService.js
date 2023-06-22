const db = require('../config/database');
const bcrypt = require('bcrypt');

const userService = {
    
/**
 * Get all users from the database.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of user objects.
 */
  getUsers: () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM `user` WHERE `role` = "user"';
      db.query(query, (error, results) => {
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
   * @param {string} email - The user's email address.
   * @param {string} username - The user's username.
   * @param {string} password - The user's password.
   * @param {string} role - The user's role.
   * @returns {Promise<object>} A promise that resolves to the created user object.
   */
  createUser: (email, username, password, role) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO `user` (email, username, password, role) VALUES (?, ?, ?, ?)';
      const values = [email, username, password, role];
      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          const insertedUserId = result.insertId;
          resolve({ id: insertedUserId, email, username, role });
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
      db.query(query, [userId], (error, results) => {
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
      db.query(query, values, (error) => {
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
      db.query(query, [userId], (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  },

  // # AUTHENTICATION
  
  /**
   * Authenticate a user based on their email and password.
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @returns {Promise<Object|null>} A promise that resolves to the authenticated user object if successful, or null if not authenticated.
   */
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM `user` WHERE email = ?';
      db.query(query, [email], async (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            const user = results[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
              resolve(user);
            } else {
              resolve(null);
            }
          } else {
            resolve(null);
          }
        }
      });
    });
  },
  
  /**
   * Create a new user in the database.
   * @param {string} email - The user's email address.
   * @param {string} username - The user's username.
   * @param {string} password - The user's password.
   * @param {string} role - The user's role.
   * @returns {Promise<object>} A promise that resolves to the created user object.
   */
  register: (email, username, password, role) => {
    return new Promise(async (resolve, reject) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10); // 10: number of times it should execute its hashing algorithm
        const query = 'INSERT INTO `user` (email, username, password, role) VALUES (?, ?, ?, ?)';
        const values = [email, username, hashedPassword, role];
        console.log(values);

        db.query(query, values, (error, result) => {
          if (error) {
            reject(error);
          } else {
            const insertedUserId = result.insertId;
            resolve({ id: insertedUserId, email, username, role });
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  },
    
  
};


module.exports = userService;
