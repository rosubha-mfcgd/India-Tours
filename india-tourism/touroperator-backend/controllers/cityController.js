const City = require('../models/City');
const getNextSequence = require("../utility/getNextSequence");
/**
 * Add new city
 */
exports.addCity = async (req, res) => {
  try {
    const { name, state } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "City name is required" });
    }

    if (!state || isNaN(Number(state))) {
      return res.status(400).json({ error: "Valid stateId is required" });
    }

    // Generate numeric _id for City
    const numericId = await getNextSequence("city");
    console.log(' Generated city numericId ', numericId );
    const city = new City({
      _id: numericId,
      name: name.trim(),
      state: Number(state)
    });

    await city.save();

    res.status(201).json({
      cityId: city._id,       // numeric city ID
      name: city.name,
      state: city.state
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


/*
* Get Cities by State ID
*/
exports.getCitiesByState = async (req, res) => {
    try {
        const { stateId } = req.params;
        console.log('state ID is...',stateId)
        if (!stateId) return res.status(400).json({ error: 'State ID required' });
        console.log(' getCitiesByState ', stateId);
        const numericStateId = Number(stateId); // convert param to number

        const cities = await City.find({ state: numericStateId }).sort({ name: 1 });
        res.json(cities); // returns array of { _id, name, state }
         
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
        const cities = await City.find()
            .populate('state', 'name')
            .sort({ name: 1 }); // sort by city name ascending
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
