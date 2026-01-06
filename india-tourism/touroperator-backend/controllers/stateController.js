const State = require("../models/State");
const getNextSequence = require("../utility/getNextSequence");

/**
 * Add new state
 */
exports.addState = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "State name is required" });
    }

    // Generate numeric ID for _id
    const numericId = await getNextSequence("state");

    const state = new State({
      _id: numericId,
      name: name.trim()
    });

    await state.save();

    // Return numeric _id as stateId
    res.status(201).json({
      stateId: state._id,
      name: state.name
    });
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
        const states = await State.find().sort({ name: 1 }); // 1 = ascending
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
