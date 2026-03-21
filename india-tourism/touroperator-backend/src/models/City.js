const mongoose = require('mongoose');

const citySchema = new mongoose.Schema(
 {
     _id: {
      type: Number,
      unique: true,
      index: true
    },
    name: {
      type: String,
      required: true
    },
    state: {
      type: Number, // stateId
      ref: "State",
      required: true
    }
  },
  { timestamps: true }
);

citySchema.index({ name: 1, state: 1 }, { unique: true });

module.exports = mongoose.model('City', citySchema);
