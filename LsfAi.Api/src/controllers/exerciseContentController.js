const exerciseContentService = require('../services/exerciseContentService');

/**
 * Get all exercice contents.
 * @route GET /exerciceContent
 * @returns {Promise<object[]>} A promise that resolves to an array of user objects.
 */
const getAllExerciseContents = async (req, res) => {
    try {
        const exerciseContents = await exerciseContentService.getExerciseContents();
        res.json(exerciseContents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve exercise contents' });
    }
};


/**
 * Get exercice content by ID.
 * @route GET /exerciceContent/{id}
 * @param {number} id - The ID of the exercice.
 * @returns {Promise<object>} A promise that resolves to the exercice object.
 */
const getExerciseContentById = async (req, res) => {
    try {
        const exerciseId = parseInt(req.params.id);
        const exerciseContent = await exerciseContentService.getExerciseContentById(exerciseId);
        if (exerciseContent) {
            res.json(exerciseContent);
        } else {
            res.status(404).json({ error: 'Exercise not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve exercise' });
    }
};


//exports all the functions defined
module.exports = {
    getAllExerciseContents, getExerciseContentById
};