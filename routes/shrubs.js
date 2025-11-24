//const express = require('express');
const router = require("express").Router();
const shrubsController = require("../controllers/shrubs");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", shrubsController.getAll);
router.get("/:id", shrubsController.getSingle);
router.post("/", isAuthenticated, shrubsController.createShrubs);
router.put("/:id", isAuthenticated, shrubsController.updateShrubs);
router.delete("/:id", isAuthenticated, shrubsController.deleteShrubs);

module.exports = router;