const db = require("../../config/database");
const bcrypt = require("bcrypt"); // Crypt library

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
          reject(new Error("Failed to get users from the database" + error));
        } else {
          resolve(results);
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
      const query = "SELECT * FROM `user` WHERE id = ?";
      db.query(query, [userId], (error, results) => {
        if (error) {
          reject(
            new Error("Failed to get user by ID from the database" + error)
          );
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
   * @param {string} email - The new email address.
   * @param {string} username - The new username.
   * @returns {Promise<Object>} A promise that resolves to the updated user object.
   */
  updateUser: (userId, email, password) => {
    if (
      typeof userId !== "number" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return Promise.reject(new Error("Invalid email or password"));
    }
    // Validate email format (basic validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Promise.reject(new Error("Invalid email address"));
    }

    if (password.length < 8) {
      return Promise.reject(
        new Error("Password should be at least 8 characters long")
      );
    }

    return new Promise(async (resolve, reject) => {
      try {
        
        // Perform additional password complexity checks
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
          return reject(
            new Error(
              "Password should be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
            )
          );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const query =
          "UPDATE `user` SET email = ?, password = ? WHERE id = ?";
        const values = [email, hashedPassword, userId];
  
        db.query(query, values, (error, result) => {
          if (error) {
            reject(new Error("Failed to update user in the database" + error));
          } else {
            resolve({ id: userId, email, password });
          }
        });
      } catch (error) {
        reject(new Error("Failed to update user" + error));
      }
    });
  },
  

  /**
   * Delete a user from the database.
   * @param {number} userId - The ID of the user to delete.
   * @returns {Promise<void>} A promise that resolves when the user is successfully deleted.
   */
  deleteUser: (userId) => {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM `user` WHERE id = ?";
      db.query(query, [userId], (error) => {
        if (error) {
          reject(new Error("Failed to delete user" + error));
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
    // Parameter type check
    if (typeof email !== "string" || typeof password !== "string") {
      return Promise.reject(new Error("Invalid email or password"));
    }
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM `user` WHERE email = ?";
      db.query(query, [email], async (error, results) => {
        if (error) {
          reject(new Error("Failed to authenticate user" + error));
        } else {
          if (results.length > 0) {
            const user = results[0];
            const isPasswordValid = await bcrypt.compare(
              password,
              user.password
            );
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
   * @returns {Promise<object>} A promise that resolves to the created user object.
   */
  register: (email, username, password) => {
    // Parameter type check
    if (
      typeof email !== "string" ||
      typeof username !== "string" ||
      typeof password !== "string"
    ) {
      return Promise.reject(new Error("Invalid email, username, or password"));
    }

    // Validate input data
    if (password.length < 8) {
      return Promise.reject(
        new Error("Password should be at least 8 characters long")
      );
    }

    // Validate email format (basic validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Promise.reject(new Error("Invalid email address"));
    }

    return new Promise(async (resolve, reject) => {
      try {
        // Check if the email already exists in the database
        const emailExists = await userService.checkEmailExists(email);
        if (emailExists) {
          return reject(new Error("Email address already exists"));
        }

        // Perform additional password complexity checks
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
          return reject(
            new Error(
              "Password should be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
            )
          );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const query =
          "INSERT INTO `user` (email, username, password, role) VALUES (?, ?, ?, ?)";
        const values = [email, username, hashedPassword, "user"];

        db.query(query, values, (error, result) => {
          if (error) {
            reject(
              new Error("Failed to register user in the database" + error)
            );
          } else {
            const insertedUserId = result.insertId;
            resolve({ id: insertedUserId, email, username });
          }
        });
      } catch (error) {
        reject(new Error("Failed to register user" + error));
      }
    });
  },

  /**
   * Check if an email address already exists in the database.
   * @param {string} email - The email address to check.
   * @returns {Promise<boolean>} A promise that resolves to true if the email exists, false otherwise.
   */
  checkEmailExists: (email) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT COUNT(*) AS count FROM `user` WHERE email = ?";
      db.query(query, [email], (error, results) => {
        if (error) {
          reject(new Error("Failed to check email existence" + error));
        } else {
          const count = results[0].count;
          resolve(count > 0);
        }
      });
    });
  },
};

module.exports = userService;
