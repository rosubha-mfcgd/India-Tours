"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityModel = void 0;
const mongoose_1 = require("mongoose");
const citySchema = new mongoose_1.Schema({
    cityCode: {
        type: Number,
        required: true
    },
    cityDesc: {
        type: String,
        required: true
    },
});
exports.CityModel = (0, mongoose_1.model)('City', citySchema);
