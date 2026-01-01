const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: { type: String, required: true },
    state: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true }
});

citySchema.index({ name: 1, state: 1 }, { unique: true });

module.exports = mongoose.model('City', citySchema);
