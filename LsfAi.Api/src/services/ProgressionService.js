const db = require('../../config/database');
const progressionService = {
  /**
   * Get all exercise progressions and its definition from the database.
   * @returns {Promise<Array<Object>>} A promise that resolves to an array of user objects.
   */
  getProgressions: () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT `progression_level`,`description` FROM `progression`,`exercise` WHERE  exercise.id = progression.exercise_id';
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
   * Get all exercise progressions and its definition from the database.
   * @param {number} userId - The User ID.
   * @returns {Promise<Array<Object>>} A promise that resolves to an array of progression objects.
   */
  getProgressionsByUser: (userId) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT `progression_level`,`description` FROM `progression`,`exercise` WHERE progression.user_id = ? AND exercise.id = progression.exercise_id';
      db.query(query, [userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  /**
   * Get a progression url based on progression id from the database.
   * @param {number} id - The ID of the progression.
   * @returns {Promise<Object|null>} A promise that resolves to the progression object if found, or null if not found.
   */
  getProgressionById: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT `progression_level`,`description` FROM `progression`,`exercise` WHERE progression.id = ? AND exercise.id = progression.exercise_id';
      db.query(query, [id], (error, results) => {
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
    * Create a new progression in the database.
    * @param {number} user_id - The user id.
    * @param {Object} progressionData - The updated progression data.
    * @returns {Promise<object>} A promise that resolves to the created progression object.
    */
  createProgression: (user_id, progressionData) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO `progression` (progression_level, exercise_id, user_id) VALUES (?, ?, ?)';
      const values = [progressionData.progression_level, progressionData.exercise_id, user_id];
      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          const insertedProgressionId = result.insertId;
          resolve({
            id: insertedProgressionId, 
            progression_level: progressionData.progression_level, 
            exercise_id: progressionData.exercise_id,
            user_id: progressionData.user_id,
          });
        }
      });
    });
  },

  /**
      * Update a progression def in the database.
      * @param {number} id - The ID of the progression to update.
      * @param {Object} progressionData - The updated progression data.
      * @returns {Promise<Object>} A promise that resolves to the updated progression object.
      */
  updateProgression: (id, progressionData) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE `progression` SET progression_level = ?, exercise_id = ? WHERE id = ?';
      const values = [progressionData.progression_level, progressionData.exercise_id, id];
      db.query(query, values, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve({ id: id, ...progressionData });
        }
      });
    });
  },
  /**
  * Delete a progression from the database.
  * @param {number} id - The ID of the progression to delete.
  * @returns {Promise<void>} A promise that resolves when the progression is successfully deleted.
  */
  deleteProgression: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM `progression` WHERE id = ?';
      db.query(query, [id], (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  },



}

module.exports = progressionService;
