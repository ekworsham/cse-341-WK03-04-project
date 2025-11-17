const express = require('express');
const router = express.Router();
const shrubsController = require('../controllers/shrubs');

router.get('/', shrubsController.getAll);

router.get('/:id', shrubsController.getSingle);

router.post('/', shrubsController.createShrubs);

router.put('/:id', shrubsController.updateShrubs);

router.delete('/:id', shrubsController.deleteShrubs);


module.exports = router;