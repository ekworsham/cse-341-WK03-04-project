const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags = ['Shrubs']
  const result = await mongodb.getDatabase().db().collection('shrubs').find();
  result.toArray().then((shrubs) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(shrubs);
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags = ['Shrubs']
  const shrubsId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('shrubs').find({ _id: shrubsId });
  result.toArray().then((shrubs) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(shrubs[0]);
  });
};

const createShrubs = async (req, res) => {
  //#swagger.tags = ['Shrubs']
  const shrubs = {
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
  const response = await mongodb.getDatabase().db().collection('shrubs').insertOne(shrubs);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the shrubs.');
  }
};

const updateShrubs= async (req, res) => {
  //#swagger.tags = ['Shrubs']
  const shrubsId = new ObjectId(req.params.id);
  const shrubs = {
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
    .collection('shrubs')
    .replaceOne({ _id: shrubsId }, shrubs);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the shrubs.');
  }
};

const deleteShrubs = async (req, res) => {
  //#swagger.tags = ['Shrubs']
  const shrubsId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('shrubs').deleteOne({ _id: shrubsId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the shrubs.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createShrubs,
  updateShrubs,
  deleteShrubs
};