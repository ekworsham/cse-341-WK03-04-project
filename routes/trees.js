//const express = require('express');
const router = require("express").Router();
const treesController = require("../controllers/trees");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", treesController.getAll);
router.get("/:id", treesController.getSingle);
router.post("/", isAuthenticated, treesController.createTrees);
router.put("/:id", isAuthenticated, treesController.updateTrees);
router.delete("/:id", isAuthenticated, treesController.deleteTrees);

module.exports = router;