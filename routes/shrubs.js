const express = require('express');
const router = express.Router();
const createController = require('../controllers/collectionController');
const shrubs = createController('shrubs');

router.get('/', shrubs.getAll);
router.get('/:id', shrubs.getSingle);

module.exports = router;