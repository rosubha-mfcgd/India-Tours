"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToursModel = void 0;
const mongoose_1 = require("mongoose");
const toursSchema = new mongoose_1.Schema({
    locationName: {
        type: String,
        required: true,
        trim: true,
    },
    categoryID: {
        type: Number,
        required: true
    },
    tourManagerId: {
        type: String,
        required: true,
        trim: true,
    },
    tripLength: {
        type: String,
        required: true
    },
    packageCost: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    ticketCost: {
        type: String,
        required: true,
    },
    maxTourist: {
        type: String,
        required: true,
    },
    seatsLeft: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    tourType: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    itinerary: {
        type: String
    }
});
exports.ToursModel = (0, mongoose_1.model)('Tours', toursSchema);
