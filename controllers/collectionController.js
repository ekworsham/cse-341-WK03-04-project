const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

module.exports = function createCollectionController(collectionName) {
  const getAll = async (req, res) => {
    try {
      const items = await mongodb.getDatabase().db().collection(collectionName).find().toArray();
      return res.status(200).json(items);
    } catch (err) {
      return res.status(500).json({ message: 'DB error', error: err.message });
    }
  };

  const getSingle = async (req, res) => {
    try {
      const id = new ObjectId(req.params.id);
      const item = await mongodb.getDatabase().db().collection(collectionName).findOne({ _id: id });
      if (!item) return res.status(404).json({ message: `${collectionName.slice(0, -1)} not found` });
      return res.status(200).json(item);
    } catch (err) {
      return res.status(400).json({ message: 'Invalid id or DB error', error: err.message });
    }
  };

  return { getAll, getSingle };
};