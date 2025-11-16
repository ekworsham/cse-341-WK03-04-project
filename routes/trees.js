const express = require('express');
const router = express.Router();
const createController = require('../controllers/collectionController');
const trees = createController('trees');

router.get('/', trees.getAll);
router.get('/:id', trees.getSingle);

module.exports = router;