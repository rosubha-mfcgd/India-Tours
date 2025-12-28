const City = require('../models/City');

/**
 * Add new city
 */
exports.addCity = async (req, res) => {
    try {
        const { name, stateId } = req.body;
        const city = new City({ name, state: stateId });
        await city.save();
        res.status(201).json(city);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

/**
 * Update city
 */
exports.updateCity = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, stateId } = req.body;

        const city = await City.findByIdAndUpdate(
            id,
            { name, state: stateId },
            { new: true, runValidators: true }
        );

        if (!city) return res.status(404).json({ error: 'City not found' });

        res.json(city);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

/**
 * Delete city
 */
exports.deleteCity = async (req, res) => {
    try {
        const { id } = req.params;
        const city = await City.findByIdAndDelete(id);
        if (!city) return res.status(404).json({ error: 'City not found' });
        res.json({ message: 'City deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

/**
 * Get all cities
 */
exports.getAllCities = async (req, res) => {
    try {
        const cities = await City.find().populate('state', 'name');
        res.json(cities);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

/**
 * Get city by ID
 */
exports.getCityById = async (req, res) => {
    try {
        const { id } = req.params;
        const city = await City.findById(id).populate('state', 'name');
        if (!city) return res.status(404).json({ error: 'City not found' });
        res.json(city);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
