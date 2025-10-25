"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationsModel = void 0;
const mongoose_1 = require("mongoose");
const locationSchema = new mongoose_1.Schema({
    locationID: {
        type: Number,
        required: true
    },
    spotName: {
        type: String,
        required: true
    },
    locationDesc: String,
    categoryID: {
        type: Number,
        required: true
    }
});
exports.LocationsModel = (0, mongoose_1.model)('Locations', locationSchema);
