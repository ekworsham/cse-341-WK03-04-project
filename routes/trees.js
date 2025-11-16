const express = require('express');
const router = express.Router();
const treesController = require('../controllers/trees');

router.get('/', treesController.getAll);

router.get('/:id', treesController.getSingle);

router.post('/', treessController.createTrees);

router.put('/:id', treessController.updateTrees);

router.delete('/:id', treessController.deleteTrees);

module.exports = router;