const express = require('express')
const router = express.Router()
const signController = require('../controllers/signController.js');

router.get('/', signController.getAllSigns);
router.get('/:id', signController.getSignById);
router.post('/', signController.createSign);
router.put('/:id', signController.updateSign);
router.delete('/:id', signController.deleteSign);

module.exports = router;