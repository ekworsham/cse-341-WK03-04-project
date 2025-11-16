const express = require('express');
const router = express.Router();
const shrubsController = require('../controllers/shrubs');

router.get('/', shrubsController.getAll);

router.get('/:id', shrubsController.getSingle);

router.post('/', shubssController.createShubs);

router.put('/:id', shubssController.updateShubs);

router.delete('/:id', shubssController.deleteShubs);


module.exports = router;