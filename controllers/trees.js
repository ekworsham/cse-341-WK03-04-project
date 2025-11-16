const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags-['trees']
  const result = await mongodb.getDatabase().db().collection('trees').find();
  result.toArray().then((trees) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(trees);
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags-['trees']
  const treesId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('trees').find({ _id: treesId });
  result.toArray().then((trees) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(trees[0]);
  });
};

const createTrees = async (req, res) => {
  //#swagger.tags-['Trees']
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
    res.status(500).json(response.error || 'Some error occurred while updating the trees.');
  }
};

const updateTrees= async (req, res) => {
  //#swagger.tags-['trees']
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
};

const deleteTrees = async (req, res) => {
  //#swagger.tags-['Trees']
  const treesId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('trees').deleteOne({ _id: treesId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the trees.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createTrees,
  updateTrees,
  deleteTrees
};