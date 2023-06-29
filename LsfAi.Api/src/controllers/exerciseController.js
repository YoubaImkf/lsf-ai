const exerciseService = require('../services/ExerciseService');
const progressionService = require('../services/ProgressionService');

/**
 * Get all exercises by User ID.
 * @route GET /exercises/levels
 * @param {number} exerciseId - The User ID.
 * @returns {Promise<object>} A promise that resolves to a number.
 */
const getLevelsByExercise = async (req, res) => {

  try {
    const maxLevelsByExercise = await progressionService.getMaxProgressions();

    const exercisesById = [];
    let test;
    for (let i = 0; i < maxLevelsByExercise.length; i++) {
    }

    const exercisesDetails = [];
    maxLevelsByExercise.forEach((exerciseLevel) => {
      
      exercisesDetails.push({
        'exerciseLevel' : exerciseLevel.max_progression_level,
        'exerciseName' : exerciseLevel
      });
    });

    res.json(exercisesDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve exercises' });
  }

};

/**
 * Get all exercises url.
 * @route GET /exercises
 * @returns {Promise<object[]>} A promise that resolves to an array of exercise objects.
 */
const getAllExercises = async (req, res) => {
  try {
    const exercises = await exerciseService.getExercises();
    res.json(exercises);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve exercises' });
  }
};

/**
 * Get all exercises by User ID.
 * @route GET /exercises/user{userId}
 * @param {number} userId - The User ID.
 * @returns {Promise<object[]>} A promise that resolves to an array of exercise objects.
 */
const getAllExercisesByUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const exercises = await exerciseService.getExercisesByUser(userId);
    if (exercises) {
      res.json(exercises);
    } else {
      res.status(404).json({ error: 'Exercise not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve exercises' });
  }
};

/**
 * Get a exercise by ID.
 * @route GET /exercises/{id}
 * @param {number} id - The ID of the exercise.
 * @returns {Promise<object>} A promise that resolves to the exercise object.
 */
const getExerciseById = async (req, res) => {
  try {
    const exerciseId = parseInt(req.params.id);
    const exercise = await exerciseService.getExerciseById(exerciseId);
    if (exercise) {
      res.json(exercise);
    } else {
      res.status(404).json({ error: 'Exercise not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve exercise' });
  }
};

/**
 * Create a new exercise.
 * @route POST /exercises/user{userId}
 * @param {number} userId - Information about the exercise to be created.
 * @param {object} exercise - Information about the exercise to be created.
 * @returns {Promise<object>} A promise that resolves to the created exercise object.
 */
const createExercise = async (req, res) => {
  try {
    const exerciseData = req.body;
    const userId = parseInt(req.params.userId);
    const newExercise = await exerciseService.createExercise(userId, exerciseData);
    res.status(201).json(newExercise);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create exercise ' });
  }
};


/**
 * Update a exercise by ID.
 * @route PUT /exercises/{id}
 * @param {number} id - The ID of the exercise to be updated.
 * @param {object} exercise - Updated information about the exercise.
 * @returns {Promise<object>} A promise that resolves to the updated exercise object.
 */
const updateExercise = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const exerciseData = req.body;
    const updatedExercise = await exerciseService.updateExercise(id, exerciseData);
    if (updatedExercise) {
      res.json(updatedExercise);
    } else {
      res.status(404).json({ error: 'Exercise not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update exercise' });
  }
};


/**
 * Delete a exercise by ID.
 * @route DELETE /exercises/{id}
 * @param {number} id - The ID of the exercise to be deleted.
 * @returns {Promise<object>} A promise that resolves to a success message.
 */
const deleteExercise = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deletedExercise = await exerciseService.deleteExercise(id);
    if (deletedExercise) {
      res.json({ message: 'Exercise deleted' });
    } else {
      res.status(404).json({ error: 'Exercise not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete exercise' });
  }
};

//exports all the functions defined
module.exports = {
  getLevelsByExercise, getAllExercisesByUser, getAllExercises, getExerciseById, createExercise, updateExercise, deleteExercise
};