const db = require('../../config/database');
const exerciseService = {

  /**
   * Get all exercises and description from the database.
   * @returns {Promise<Array<Object>>} A promise that resolves to an array of user objects.
   */
    getExercises: () => {
      return new Promise((resolve, reject) => {
        const query = 'SELECT `exercise_level`,`description` FROM `exercise`,`exercise` WHERE  exercise.id = exercise.exercise_id';
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
   * Get all exercise exercises and description from the database.
   * @param {number} userId - The User ID.
   * @returns {Promise<Array<Object>>} A promise that resolves to an array of exercise objects.
   */
  getExercisesByUser: (userId) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM `exercise` WHERE exercise.user_id = ? AND exercise.id = exercise.exercise_id';
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
   * Get a exercise url based on exercise id from the database.
   * @param {number} id - The ID of the exercise.
   * @returns {Promise<Object|null>} A promise that resolves to the exercise object if found, or null if not found.
   */
  getExerciseById: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM `exercise` WHERE id = ?';
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
    * Create a new exercise in the database.
    * @param {number} user_id - The user id.
    * @param {Object} exerciseData - The updated exercise data.
    * @returns {Promise<object>} A promise that resolves to the created exercise object.
    */
  createExercise: (user_id, exerciseData) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO `exercise` (exercise_level, exercise_id, user_id) VALUES (?, ?, ?)';
      const values = [ExerciseData.Exercise_level, exerciseData.exercise_id, user_id];
      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          const insertedExerciseId = result.insertId;
          resolve({
            id: insertedExerciseId, 
            exercise_level: exerciseData.Exercise_level, 
            exercise_id: exerciseData.exercise_id,
            user_id: exerciseData.user_id,
          });
        }
      });
    });
  },

  /**
      * Update a exercise def in the database.
      * @param {number} id - The ID of the exercise to update.
      * @param {Object} exerciseData - The updated exercise data.
      * @returns {Promise<Object>} A promise that resolves to the updated exercise object.
      */
  updateExercise: (id, exerciseData) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE `exercise` SET exercise_level = ?, exercise_id = ?, repeat_number = ? WHERE id = ?';
      const values = [ExerciseData.Exercise_level, exerciseData.exercise_id, exerciseData.repeat_number, id];
      db.query(query, values, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve({ id: id, ...ExerciseData });
        }
      });
    });
  },
  /**
  * Delete a exercise from the database.
  * @param {number} id - The ID of the exercise to delete.
  * @returns {Promise<void>} A promise that resolves when the exercise is successfully deleted.
  */
  deleteExercise: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM `exercise` WHERE id = ?';
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

module.exports = exerciseService;
