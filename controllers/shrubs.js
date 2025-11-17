const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags = ['Shrubs']
  try {
    const result = await mongodb.getDatabase().db().collection('shrubs').find();
    const shrubs = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(shrubs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Failed to get shrubs.' });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags = ['Shrubs']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID provided.' });
    }
    const shrubsId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('shrubs').find({ _id: shrubsId });
    const shrubs = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(shrubs[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Failed to get the shrub.' });
  }
};

const createShrubs = async (req, res) => {
  //#swagger.tags = ['Shrubs']
  try {
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
      res.status(500).json(response.error || 'Some error occurred while creating the shrub.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Failed to create shrub.' });
  }
};

const updateShrubs= async (req, res) => {
  //#swagger.tags = ['Shrubs']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID provided.' });
    }
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Failed to update shrub.' });
  }
};

const deleteShrubs = async (req, res) => {
  //#swagger.tags = ['Shrubs']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID provided.' });
    }
    const shrubsId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('shrubs').deleteOne({ _id: shrubsId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the shrubs.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Failed to delete shrub.' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createShrubs,
  updateShrubs,
  deleteShrubs
};