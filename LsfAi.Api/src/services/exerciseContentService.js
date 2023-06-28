const db = require('../../config/database');

const exerciseContentService = {

    /**
     * Get all exercice contents from the database.
     * @returns {Promise<Array<Object>>} A promise that resolves to an array of user objects.
     */
    getExerciseContents: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT `question`, `answer` FROM `exercise_content`';
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
     * Get exercices by Id from the database.
     * @returns {Promise<Array<Object>>} A promise that resolves to an array of user objects.
     */
    getExerciseContentById: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT `question` FROM `exercise_content` where `exercise_id` = ?';

            db.query(query, [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
};

module.exports = exerciseContentService;