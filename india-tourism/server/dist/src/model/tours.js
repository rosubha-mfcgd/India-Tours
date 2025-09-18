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
    triplength: {
        type: String,
        required: true
    },
    package_cost: {
        type: String,
        required: true,
    },
    ticket_cost: {
        type: String,
        required: true,
    },
    max_tourist: {
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
    domesticOrInternational: {
        type: String,
        required: true,
    },
    desc: {
        type: String
    }
});
exports.ToursModel = (0, mongoose_1.model)('Tourdetails', toursSchema);
