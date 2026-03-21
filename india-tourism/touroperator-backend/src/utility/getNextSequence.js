const Counter = require("../models/Counter");

/**
 * Universal auto-increment generator
 * @param {string} entityName - "city" | "state" | "tour" | "booking" | "payment"
 * @returns {number} next sequence number
 */
const getNextSequence = async (entityName) => {
  if (!entityName) {
    throw new Error("entityName is required for getNextSequence");
  }

  const counter = await Counter.findOneAndUpdate(
    { _id: entityName },
    { $inc: { seq: 1 } },
    {
      new: true,
      upsert: true
    }
  );

  return counter.seq;
};

module.exports = getNextSequence;