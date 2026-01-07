"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToursModel = void 0;
const mongoose_1 = require("mongoose");
const toursSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        trim: true,
    },
    image: {
        fileId: mongoose_1.Schema.Types.ObjectId,
        filename: String
    },
    categoryID: {
        type: Number,
        required: true,
        trim: true,
    },
    tourOperator: {
        _id: String,
        firstName: String,
        lastName: String,
    },
    tripLength: {
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
    city: {
        _id: String,
        name: String,
    },
    state: {
        _id: String,
        name: String,
    },
    category: {
        _id: String,
        name: String,
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    },
    days: {
        type: String,
        required: true,
    },
    night: {
        type: String,
        required: true,
    },
    cityName: {
        type: String,
        required: true,
    },
    stateName: {
        type: String,
        required: true,
    },
    tourOperatorName: {
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
    currency: {
        type: String,
        required: true,
    },
    tourType: {
        type: String,
        required: true,
    },
    ticketCost: {
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
