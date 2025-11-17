const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags = ['Trees']
  try {
    const result = await mongodb.getDatabase().db().collection('trees').find();
    const trees = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(trees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Failed to get trees.' });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags = ['Trees']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID provided.' });
    }
    const treesId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('trees').find({ _id: treesId });
    const trees = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(trees[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Failed to get the tree.' });
  }
};

const createTrees = async (req, res) => {
  //#swagger.tags = ['Trees']
  try {
    const trees = {
      plantName: req.body.plantName,
      family: req.body.family,
      genus: req.body.genus,
      species: req.body.species,
      cultivar: req.body.cultivar,
      hardinessZone: req.body.hardinessZone,
      flower: req.body.flower,
      leaf: req.body.leaf,
      growthHabit: req.body.growthHabit
    };
    const response = await mongodb.getDatabase().db().collection('trees').insertOne(trees);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the tree.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Failed to create tree.' });
  }
};

const updateTrees= async (req, res) => {
  //#swagger.tags = ['Trees']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID provided.' });
    }
    const treesId = new ObjectId(req.params.id);
    const trees = {
      plantName: req.body.plantName,
      family: req.body.family,
      genus: req.body.genus,
      species: req.body.species,
      cultivar: req.body.cultivar,
      hardinessZone: req.body.hardinessZone,
      flower: req.body.flower,
      leaf: req.body.leaf,
      growthHabit: req.body.growthHabit
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('trees')
      .replaceOne({ _id: treesId }, trees);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the trees.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Failed to update tree.' });
  }
};

const deleteTrees = async (req, res) => {
  //#swagger.tags = ['Trees']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID provided.' });
    }
    const treesId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('trees').deleteOne({ _id: treesId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the trees.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Failed to delete tree.' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createTrees,
  updateTrees,
  deleteTrees
};