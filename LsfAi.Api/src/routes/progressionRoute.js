const express = require('express')
const router = express.Router()
const progressionController = require('../controllers/progressionController.js');

//calculated progression of user 
router.get('/user:userId/average', progressionController.getAverageProgressionByUser);

router.get('/user:userId', progressionController.getAllProgressionsByUser);
router.get('/', progressionController.getAllProgressions);
router.get('/:id', progressionController.getProgressionById);
router.post('/user:userId', progressionController.createProgression);
router.put('/:id', progressionController.updateProgression);
router.delete('/:id', progressionController.deleteProgression);

module.exports = router;