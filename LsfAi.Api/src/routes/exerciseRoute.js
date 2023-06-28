const express = require('express')
const router = express.Router()
const exerciseController = require('../controllers/exerciseController.js');

// get all exercises with their levels
router.get('/levels', exerciseController.getLevelsByExercise);


router.get('/', exerciseController.getAllExercises);
router.get('/:id', exerciseController.getExerciseById);
router.post('/user:userId', exerciseController.createExercise);
router.put('/:id', exerciseController.updateExercise);
router.delete('/:id', exerciseController.deleteExercise);

module.exports = router;