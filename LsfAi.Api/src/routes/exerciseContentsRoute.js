const express = require('express')
const router = express.Router()
const exerciseContentController = require('../controllers/exerciseContentController.js');

router.get('/', exerciseContentController.getAllExerciseContents);
router.get('/:id', exerciseContentController.getExerciseContentById);

module.exports = router;