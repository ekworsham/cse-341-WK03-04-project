const express = require('express');
const router = express.Router();
const treesController = require('../controllers/trees');

router.get('/', treesController.getAll);

router.get('/:id', treesController.getSingle);

router.post('/', treesController.createTrees);

router.put('/:id', treesController.updateTrees);

router.delete('/:id', treesController.deleteTrees);

module.exports = router;