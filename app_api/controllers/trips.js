const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');

// GET: /trips - lists all trips
const tripsList = async (req, res) => {
    try {
        const q = await Model
            .find({})
            .exec();

        if (!q || q.length === 0) {
            return res
                .status(404)
                .json({ message: 'No trips found' });
        }

        return res
            .status(200)
            .json(q);

    } catch (err) {
        return res
            .status(500)
            .json(err);
    }
};

// GET: /trips/:tripCode - returns one trip
const tripsFindByCode = async (req, res) => {
    try {
        const q = await Model
            .findOne({ code: req.params.tripCode })
            .exec();

        if (!q) {
            return res
                .status(404)
                .json({ message: 'Trip not found' });
        }

        return res
            .status(200)
            .json(q);

    } catch (err) {
        return res
            .status(500)
            .json(err);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};