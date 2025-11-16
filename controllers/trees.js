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

module.exports = {
  getAll,
  getSingle
};