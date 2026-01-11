const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    _id: {
      type: Number,  // numeric auto-increment
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    description: {
      type: String,
      trim: true
    },
    image: {
      type: mongoose.Schema.Types.ObjectId, // GridFS file ID
      ref: "categoryImages",
      default: null
    },
    favorite:{
       type: String,
     },
     productID:{
       type: Number,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
