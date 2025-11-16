const express = require('express');
const router = express.Router();
const treesController = require('../controllers/trees');

router.get('/', treesController.getAll);
router.get('/:id', treesController.getSingle);

module.exports = router;