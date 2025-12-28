const State = require('../models/State');

/**
 * Add new state
 */
exports.addState = async (req, res) => {
    try {
        const { name } = req.body;
        const state = new State({ name });
        await state.save();
        res.status(201).json(state);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

/**
 * Update state
 */
exports.updateState = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const state = await State.findByIdAndUpdate(
            id,
            { name },
            { new: true, runValidators: true }
        );

        if (!state) return res.status(404).json({ error: 'State not found' });

        res.json(state);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

/**
 * Delete state
 */
exports.deleteState = async (req, res) => {
    try {
        const { id } = req.params;
        const state = await State.findByIdAndDelete(id);
        if (!state) return res.status(404).json({ error: 'State not found' });
        res.json({ message: 'State deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

/**
 * Get all states
 */
exports.getAllStates = async (req, res) => {
    try {
        const states = await State.find();
        res.json(states);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

/**
 * Get state by ID
 */
exports.getStateById = async (req, res) => {
    try {
        const { id } = req.params;
        const state = await State.findById(id);
        if (!state) return res.status(404).json({ error: 'State not found' });
        res.json(state);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
