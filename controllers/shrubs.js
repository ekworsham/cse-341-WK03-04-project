const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Validate incoming plant data for create/update
function validatePlantData(body) {
  const errors = [];
  if (!body || typeof body !== 'object') {
    errors.push('Request body must be a JSON object.');
    return { valid: false, errors };
  }
  if (!body.plantName || typeof body.plantName !== 'string' || body.plantName.trim() === '') {
    errors.push('plantName is required and must be a non-empty string.');
  }
  if (!body.family || typeof body.family !== 'string' || body.family.trim() === '') {
    errors.push('family is required and must be a non-empty string.');
  }
  if (!body.genus || typeof body.genus !== 'string' || body.genus.trim() === '') {
    errors.push('genus is required and must be a non-empty string.');
  }
  if (!body.species || typeof body.species !== 'string' || body.species.trim() === '') {
    errors.push('species is required and must be a non-empty string.');
  }
  if (body.hardinessZone !== undefined && typeof body.hardinessZone !== 'number' && typeof body.hardinessZone !== 'string') {
    errors.push('hardinessZone must be a number or string when provided.');
  }
  if (!body.growthHabit || typeof body.growthHabit !== 'string' || body.growthHabit.trim() === '') {
    errors.push('growthHabit is required and must be a non-empty string.');
  }
  return { valid: errors.length === 0, errors };
}
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
    const validation = validatePlantData(req.body);
    if (!validation.valid) {
      return res.status(400).json({ errors: validation.errors });
    }

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
    const validation = validatePlantData(req.body);
    if (!validation.valid) {
      return res.status(400).json({ errors: validation.errors });
    }

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