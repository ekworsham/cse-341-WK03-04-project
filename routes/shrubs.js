const express = require('express');
const router = express.Router();
const shrubsController = require('../controllers/shrubs');

router.get('/', shrubsController.getAll);
router.get('/:id', shrubsController.getSingle);

module.exports = router;