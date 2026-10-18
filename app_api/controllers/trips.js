const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');

const tripsList = async (req, res) => {
  try {
    const q = await Model.find({}).exec();

    if (!q || q.length === 0) {
      return res.status(404).json({ message: 'No trips found' });
    }

    return res.status(200).json(q);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const tripsFindByCode = async (req, res) => {
  try {
    const q = await Model.findOne({
      code: req.params.tripCode
    }).exec();

    if (!q) {
      return res.status(404).json({
        message: 'Trip not found'
      });
    }

    return res.status(200).json(q);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const tripsAddTrip = async (req, res) => {
  try {
    const newTrip = await Model.create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    });

    return res.status(201).json(newTrip);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const tripsUpdateTrip = async (req, res) => {
  try {
    const q = await Model.findOneAndUpdate(
      { code: req.params.tripCode },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
      },
      { new: true }
    ).exec();

    if (!q) {
      return res.status(404).json({
        message: 'Trip not found'
      });
    }

    return res.status(201).json(q);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const tripsDeleteTrip = async (req, res) => {
  try {
    const q = await Model.findOneAndDelete({
      code: req.params.tripCode
    }).exec();

    if (!q) {
      return res.status(404).json({
        message: 'Trip not found'
      });
    }

    return res.status(200).json(q);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip
};