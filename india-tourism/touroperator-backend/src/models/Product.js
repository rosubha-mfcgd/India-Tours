const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  "Product Name": { type: String, required: true },
  "Product Desc": { type: String },
  image: { type: mongoose.Schema.Types.ObjectId, ref: "productImages" }, // GridFS file ID
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
