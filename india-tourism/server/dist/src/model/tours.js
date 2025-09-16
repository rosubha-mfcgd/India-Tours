"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToursModel = void 0;
const mongoose_1 = require("mongoose");
const toursSchema = new mongoose_1.Schema({
    locationID: {
        type: Number,
        required: true,
        trim: true,
    },
    categoryID: {
        type: Number,
        required: true
    },
    operatorID: {
        type: Number,
        required: true,
        trim: true,
    },
    triplength: {
        type: String,
        required: true
    },
    package_cost: {
        type: Number,
        required: true,
    },
    ticket_cost: {
        type: Number,
        required: true,
    },
    max_tourist: {
        type: Number,
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
    domesticOrInternational: {
        type: String,
        required: true,
    },
    tourManagerId: {
        type: Number,
        required: true,
    }
});
exports.ToursModel = (0, mongoose_1.model)('Tours', toursSchema);
