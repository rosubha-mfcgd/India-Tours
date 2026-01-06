const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    _id: { type: Number }, // numeric ID

    tourOperator: { type: Number, ref: "User", required: true }, 

    tripLength: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    packageCost: { type: Number, required: true },
    nights: Number,
    days: Number,
    maxTourist: { type: Number, required: true },
    seatsLeft: { type: Number, required: true },

    tourType: { type: String, enum: ["Domestic", "International"], required: true },
    ticketCost: { type: Number, required: true },
    currency: { type: String, default: "INR" },

    city: { type: Number, ref: "City", required: true },    // changed
    state: { type: Number, ref: "State", required: true },   // changed
    category: { type: Number, ref: "Category", required: true },// changed

    description: { type: String, required: true },

    image: {
      fileId: { type: mongoose.Schema.Types.ObjectId, ref: "tourImages.files", required: true },
      filename: { type: String, required: true },
    },

    itinerary: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tour", tourSchema);
