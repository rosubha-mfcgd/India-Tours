"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityModel = void 0;
const mongoose_1 = require("mongoose");
const citySchema = new mongoose_1.Schema({
    _id: {
        type: Number,
        unique: true,
        index: true
    },
    name: {
        type: String,
        required: true
    },
    state: {
        type: Number, // stateId
        ref: "State",
        required: true
    }
});
exports.CityModel = (0, mongoose_1.model)('City', citySchema);
