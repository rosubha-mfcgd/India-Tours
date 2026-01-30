"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItineraryModel = void 0;
const mongoose_1 = require("mongoose");
const touritinerarySchema = new mongoose_1.Schema({
    locationName: {
        type: String,
        required: true
    },
    categoryID: {
        type: Number,
        required: true
    },
    tourManagerId: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    itinerary: {
        type: [],
        required: true
    }
});
exports.ItineraryModel = (0, mongoose_1.model)('Touritinerary', touritinerarySchema);
