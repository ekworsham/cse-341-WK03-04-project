const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags-['shrubs']
  const result = await mongodb.getDatabase().db().collection('shrubs').find();
  result.toArray().then((ushrubs) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(ushrubs);
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags-['shrubs']
  const shrubsId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('shrubs').find({ _id: shrubsId });
  result.toArray().then((ushrubs) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(ushrubs[0]);
  });
};

module.exports = {
  getAll,
  getSingle
};