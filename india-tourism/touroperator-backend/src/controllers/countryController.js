/**
 * Get all countries
 */
const Country = require("../models/Country");
const getNextSequence = require("../utility/getNextSequence");
exports.getAllCountries = async (req, res) => {
    try {
        const countries = await Country.find().sort({ name: 1 }); // 1 = ascending
        res.json(countries);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
/**
 * Get country by ID
 */
exports.getCountryById = async (req, res) => {
    try {
        const { id } = req.params;
        const country = await Country.findById(id);
        if (!country) return res.status(404).json({ error: 'Country not found' });
        res.json(country);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};