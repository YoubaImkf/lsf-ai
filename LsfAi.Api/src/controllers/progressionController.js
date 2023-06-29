const progressionService = require('../services/ProgressionService');

/**
 * Get all progressions by User ID.
 * @route GET /progressions/user{userId}/average
 * @param {number} userId - The User ID.
 * @returns {Promise<object>} A promise that resolves to a number.
 */
const getAverageProgressionByUser = async (req, res) => {

  try {
    const userId = parseInt(req.params.userId);
    const userProgressions = await progressionService.getProgressionsByUser(userId);
    const maxProgressions = await progressionService.getMaxProgressions();

    let averageProgressionPoints = 0;
    let avgProgressionsList = [];
    let averageUserProgression = {};

    maxProgressions.forEach((maxProgression, index) => {
      if (userProgressions.length > index) {
        avgProgressionsList.push({
          'exerciceId': maxProgression.exercise_id,
          'exerciceDescription': userProgressions[index].description,
          'exerciseLevel': parseInt(userProgressions[index].progression_level),
          'progressionLevelPerc': parseInt(userProgressions[index].progression_level / maxProgression.max_progression_level) * 100,
          'repeatNumber': parseInt(userProgressions[index].repeat_number)
        });
        averageProgressionPoints += avgProgressionsList[index].exerciseLevel * 20 + avgProgressionsList[index].repeatNumber * 10; //100points par répétition
      }
    })

    let userLevel = parseInt(averageProgressionPoints / 200) + 1;
    let remainingPoints = 200 - (averageProgressionPoints % 200);

    averageUserProgression['exerciseProgressions'] = avgProgressionsList;
    averageUserProgression['averageProgressionPoints'] = parseFloat(averageProgressionPoints);
    averageUserProgression['userLevel'] = parseInt(userLevel);
    averageUserProgression['remainingPoints'] = parseInt(remainingPoints);




    res.json(averageUserProgression);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve progressions' });
  }

};

/**
 * Get all progressions url.
 * @route GET /progressions
 * @returns {Promise<object[]>} A promise that resolves to an array of progression objects.
 */
const getAllProgressions = async (req, res) => {
  try {
    const progressions = await progressionService.getProgressions();
    res.json(progressions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve progressions' });
  }
};

/**
 * Get all progressions by User ID.
 * @route GET /progressions/user{userId}
 * @param {number} userId - The User ID.
 * @returns {Promise<object[]>} A promise that resolves to an array of progression objects.
 */
const getAllProgressionsByUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const progressions = await progressionService.getProgressionsByUser(userId);
    if (progressions) {
      res.json(progressions);
    } else {
      res.status(404).json({ error: 'progression not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve progressions' });
  }
};

/**
 * Get a progression by ID.
 * @route GET /progressions/{id}
 * @param {number} id - The ID of the progression.
 * @returns {Promise<object>} A promise that resolves to the progression object.
 */
const getProgressionById = async (req, res) => {
  try {
    const progressionId = parseInt(req.params.id);
    const progression = await progressionService.getProgressionById(progressionId);
    if (progression) {
      res.json(progression);
    } else {
      res.status(404).json({ error: 'progression not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve progression' });
  }
};

/**
 * Create a new progression.
 * @route POST /progressions/user{userId}
 * @param {number} userId - Information about the progression to be created.
 * @param {object} progression - Information about the progression to be created.
 * @returns {Promise<object>} A promise that resolves to the created progression object.
 */
const createProgression = async (req, res) => {
  try {
    const progressionData = req.body;
    const userId = parseInt(req.params.userId);
    const newProgression = await progressionService.createProgression(userId, progressionData);
    res.status(201).json(newProgression);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create progression ' });
  }
};


/**
 * Update a progression by ID.
 * @route PUT /progressions/{id}
 * @param {number} id - The ID of the progression to be updated.
 * @param {object} progression - Updated information about the progression.
 * @returns {Promise<object>} A promise that resolves to the updated progression object.
 */
const updateProgression = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const progressionData = req.body;
    const updatedProgression = await progressionService.updateProgression(id, progressionData);
    if (updatedProgression) {
      res.json(updatedProgression);
    } else {
      res.status(404).json({ error: 'progression not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update progression' });
  }
};


/**
 * Delete a progression by ID.
 * @route DELETE /progressions/{id}
 * @param {number} id - The ID of the progression to be deleted.
 * @returns {Promise<object>} A promise that resolves to a success message.
 */
const deleteProgression = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deletedProgression = await progressionService.deleteProgression(id);
    if (deletedProgression) {
      res.json({ message: 'progression deleted' });
    } else {
      res.status(404).json({ error: 'progression not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete progression' });
  }
};

//exports all the functions defined
module.exports = {
  getAverageProgressionByUser, getAllProgressionsByUser, getAllProgressions, getProgressionById, createProgression, updateProgression, deleteProgression
};